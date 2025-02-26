const PaymentModel = require("../models/payment");
const BookingModel = require("../models/booking");
// const baseUrl = "https://node-sample.aamarpay.dev/";
const WorkerProfile = require("../models/workerProfile");
const axios = require("axios");
const { v4: uuid } = require("uuid");
const NewBookingModel = require("../models/newbooking");
// Create a new payment
exports.createPaymentControler = async (req, res) => {
  try {
    let traid_id = uuid();
    const {
      amount,
      workersItems,
      cartItems,
      addressInfo,
      bookingId,
      app = "ammerpay-web",
    } = req.body;
    const formData = {
      amount,
      currency: "BDT",
      cus_email: "nahid@gmail.com",
      cus_name: addressInfo?.name,
      cus_phone: addressInfo?.phone,
      tran_id: traid_id,
      signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
      store_id: "aamarpaytest",
      desc: "desctiption",
      cus_add1: addressInfo?.address,
      cus_add2: addressInfo?.area + addressInfo?.state,
      cus_city: addressInfo?.city,
      opt_a: app,
      cus_country: "Bangladesh",
      success_url: `http://localhost:8000/api/payments/ammerpay/success/${traid_id}/${app}`,
      fail_url: `http://localhost:8000/api/payments/ammerpay/fail/${traid_id}/${app}`,
      cancel_url: `http://localhost:8000/api/payments/ammerpay/cancel/${traid_id}/${app}`,
      type: "json",
    };
    const { data } = await axios.post(
      ($url = "https://sandbox.aamarpay.com/jsonpost.php"),
      formData
    );
    if (data.result !== "true") {
      return res.status(400).json({
        flag: false,
        message: "payment fails",
      });
    }
    if (bookingId) {
      const booking = await BookingModel.findById(bookingId);
      await PaymentModel.create({
        before_payment_id: booking?.paymentid,
        user: req.user._id,
        amount,
        tran_id: traid_id,
      });
    } else {
      const payment = await PaymentModel.create({
        user: req.user._id,
        amount,
        tran_id: traid_id,
      });
      if (payment) {
        const serviceList = [];
        let total_amount = 0;
        if (cartItems?.length > 0) {
          cartItems.forEach((element) => {
            const startWork = new Date(element.startWork);
            const input = element.timeSchedule;
            const match = input.match(/^(\d+)([a-zA-Z]+)$/);
            if (match) {
              const number = parseInt(match[1], 10); // Extract and convert number
              const text = match[2]; // Extract string
              if(text == 'hours'){
                startWork.setHours(startWork.getHours() + number);
              }
              else if(text == 'days'){
                startWork.setDate(startWork.getDate() + number);
              }
              else if(text == 'weeks'){
                startWork.setDate(startWork.getDate()+ (number*7)); 
              }
              else if(text == 'months'){
                startWork.setMonth(startWork.getMonth() + number);
              }
              else{
                startWork.setFullYear(startWork.getFullYear() + number);
              }

            }
            const obj = {
              service: element._id,
              work_start_date: element.startWork,
              work_end_date: startWork.toISOString(),
              time_schedule: element.timeSchedule,
              price: element.totalPrice,
            };
            total_amount += element.totalPrice;
            serviceList.push(obj);
          });
        }
        const workerLists = [];
        if (workersItems?.length > 0) {
          workersItems.forEach((element) => {
            const obj = {
              user: element?.user?._id,
            };
            workerLists.push(obj);
          });
        }
        const booking = await BookingModel.create({
          username: addressInfo?.name,
          user: req.user._id,
          services: serviceList,
          workers: workerLists,
          area: addressInfo?.area,
          address: addressInfo?.address,
          state: addressInfo?.state,
          city: addressInfo?.city,
          phone: addressInfo?.phone,
          paymentid: payment._id,
          advance_amount: amount,
          total_amount,
          we_will_get_payment: total_amount - amount,
        });
        if (booking) {
          const newbooking = await NewBookingModel.create({
            bookingId: booking._id,
            username: addressInfo?.name,
            user: req.user._id,
            services: serviceList,
            workers: workerLists,
            area: addressInfo?.area,
            address: addressInfo?.address,
            state: addressInfo?.state,
            city: addressInfo?.city,
            phone: addressInfo?.phone,
            paymentid: payment._id,
            advance_amount: amount,
            total_amount,
            we_will_get_payment: total_amount - amount,
          });
        }
      }
    }
    if (app == "ammerpay-app") {
      return res.status(200).json({
        flag: true,
        message: "successfully",
        formData,
      });
    } else {
      return res.status(201).json({
        flag: true,
        url: data.payment_url,
      });
    }
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error + "see" + error,
    });
  }
};

///payment success
exports.successPaymentControler = async (req, res) => {
  const payment = await PaymentModel.findOne({ tran_id: req.params.traidId });
  if (payment) {
    if (payment?.before_payment_id) {
      const booking = await BookingModel.findOne({
        paymentid: payment.before_payment_id,
      });
      if (booking) {
        await BookingModel.findByIdAndUpdate(
          booking._id,
          {
            is_payment_status: "Completed",
            total_paid: booking.advance_amount + booking.we_will_get_payment,
            advance_amount: 0,
            we_will_get_payment: 0,
          },
          { new: true }
        );
        if (booking?.workers?.length > 0) {
          const workerslist = await WorkerProfile.find({});
          booking.workers.forEach(async (element) => {
            const find_worker = await workerslist.find(
              (i) => i.user.toString() == element.user.toString()
            );
            if (find_worker) {
              await WorkerProfile.findByIdAndUpdate(
                find_worker._id,
                { is_free: "YES" },
                { new: true }
              );
            }
          });
        }
      }
    } else {
      const booking = await BookingModel.findOne({ paymentid: payment._id });
      if (booking) {
        await BookingModel.findByIdAndUpdate(
          booking._id,
          { is_payment_status: "Confirmed" },
          { new: true }
        );
        if (booking?.workers?.length > 0) {
          const workerslist = await WorkerProfile.find({});
          booking.workers.forEach(async (element) => {
            const find_worker = await workerslist.find(
              (i) => i.user.toString() == element.user.toString()
            );
            if (find_worker) {
              await WorkerProfile.findByIdAndUpdate(
                find_worker._id,
                { is_free: "NO" },
                { new: true }
              );
            }
          });
        }
      }
    }
    payment.paidStatus = true;
    payment.save({ validateBeforeSave: false });
  } else {
    return res.status(400).json({
      flag: false,
      message: "payment method is not found",
    });
  }
  if (req.params.appStatus == "ammerpay-app") {
    return res.status(200).json({
      flag: true,
      message: "payment successfully completed",
    });
  }
  res.redirect("http://localhost:7000/user/payment/success");
};

///payment fail
exports.failPaymentControler = async (req, res) => {
  const payment = await PaymentModel.findOne({ tran_id: req.params.traidId });
  if (payment) {
    const bookig = await BookingModel.findOne({ paymentid: payment._id });
    if (bookig) {
      await BookingModel.findByIdAndDelete(bookig._id);
    }
    await PaymentModel.findByIdAndDelete(payment._id);
  }
  if (req.params.appStatus == "ammerpay-app") {
    return res.status(400).json({
      flag: false,
      message: "payment fails",
    });
  } else {
    res.redirect("http://localhost:7000/user/payment/fails");
  }
};

///payment cancel
exports.cancelPaymentControler = async (req, res) => {
  const payment = await PaymentModel.findOne({ tran_id: req.params.traidId });
  if (payment) {
    const bookig = await BookingModel.findOne({ paymentid: payment._id });
    if (bookig) {
      await BookingModel.findByIdAndDelete(bookig._id);
    }
    await PaymentModel.findByIdAndDelete(payment._id);
  }
  if (req.params.appStatus == "ammerpay-app") {
    return res.status(400).json({
      flag: false,
      message: "payment cancels",
    });
  } else {
    res.redirect("http://localhost:7000/user/payment/cancel");
  }
};

// List all payments
exports.listPaymentsController = async (req, res) => {
  try {
    const payments = await PaymentModel.find({}).populate(
      "before_payment_id user"
    );

    res.status(200).json({
      flag: true,
      message: "get all payment successfully!",
      payments,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};

///get payment status base

exports.statusPaymentsController = async (req, res) => {
  try {
    const { paymentStatus } = req.body; //["Pending", "Completed", "Failed"]
    const payments = await PaymentModel.find({
      status: paymentStatus,
    }).populate("booking user");
    res.status(200).json({
      flag: true,
      message: "get all status base payment successfully!",
      payments,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};

///get payment method base

exports.methodPaymentsController = async (req, res) => {
  try {
    const { paymentMethod } = req.body; //["Credit Card", "Debit Card", "PayPal", "Cash"]
    const payments = await PaymentModel.find({
      method: paymentMethod,
    }).populate("before_payment_id user");
    res.status(200).json({
      flag: true,
      message: "get all status base payment successfully!",
      payments,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};

// Get a payment by ID
exports.getPaymentByIdController = async (req, res) => {
  try {
    const payment = await PaymentModel.findById(req.params.id).populate(
      "before_payment_id user"
    );
    if (!payment) {
      return res.status(400).json({
        flag: false,
        message: "paymen is not found",
      });
    }
    res.status(200).json({
      flag: true,
      message: "get single payment successfully!",
      payment,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};

// Get a payment by user
exports.getPaymentByUserController = async (req, res) => {
  try {
    const payments = await PaymentModel.find({ user: req.params.id }).populate(
      "before_payment_id user"
    );
    if (!payments) {
      return res.status(400).json({
        flag: false,
        message: "payments is not found",
      });
    }
    res.status(200).json({
      flag: true,
      message: "get user payment successfully!",
      payments,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};

// Update a payment
exports.updatePaymentStatusController = async (req, res) => {
  try {
    const { payemntStatus } = req.body;
    const payment = await PaymentModel.findByIdAndUpdate(
      req.params.id,
      { status: payemntStatus },
      { new: true, runValidators: true }
    );
    if (!payment) {
      return res.status(400).json({
        flag: false,
        message: "payment is not found!",
      });
    }
    const payments = await PaymentModel.find({}).populate("booking user");
    res.status(200).json({
      flag: true,
      message: "payment update successfully!",
      payments,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};

// Delete a payment
exports.deletePaymentController = async (req, res) => {
  try {
    const payment = await PaymentModel.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(400).json({
        flag: false,
        message: "payment is not found!",
      });
    }
    const payments = await PaymentModel.find({}).populate("booking user");
    res.status(200).json({
      flag: true,
      message: "payment delete successfully!",
      payments,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};

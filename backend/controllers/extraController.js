//send  notification  all workers
exports.createAllWorkerGroupNotification = async (req, res) => {
    try {
      const { title, description, details_url ,end_date} = req.body;
      const users = await User.find({ userType: { $eq: "worker" } });
      let usersId = [];
      if (users?.length > 0) {
        users.forEach((element) => {
          usersId.push(element._id.toString());
        });
      }
      if (!usersId) {
        return res.status(400).json({
          flag: false,
          message: "user is required!",
        });
      }
      if (usersId?.length > 0) {
        usersId.forEach(async (item) => {
          const notification = await Notification.findOne({ user: item });
          const option = {
            user: item,
            title,
            description,
            details_url,
            end_date,
            date: Date.now(),
          };
          if (notification) {
            notification.newNotifiactions.unshift(option);
            notification.save({ validateBeforeSave: false });
          } else {
            await Notification.create({
              user: item,
              newNotifiactions: [
                { user: item, title, description, details_url, end_date},
              ],
            });
          }
        });
        res.status(201).json({
          flag: true,
          message: "notification create successfully!",
        });
      }
    } catch (error) {
      return res.status(400).json({
        flag: false,
        message: error.message,
      });
    }
  };
  //create all workers groups notification
router.post('/create/groups/all/workers/notification',isAdminUserMiddleware,isAdminMiddleware('admin'),createAllWorkerGroupNotification);
///payment create
exports.createPaymentControler = async (req, res) => {
  try {
    let traid_id = uuid();
    const { amount, workersItems, cartItems, addressInfo, bookingId } = req.body;
    const services_id = [];
    const services_total_price = [];
    const services_expries_item = [];
    const workers_user_id = [];
    const services_start = []
    //cartItems id
    if (cartItems?.length > 0) {
      cartItems?.forEach((item) => {
        services_id.push(item._id);
        services_total_price.push(item.totalPrice);
        services_expries_item.push(item.timeSchedule);
        services_start.push(item.startWork)
      });
    }
    //workers id
    if (workersItems?.length > 0) {
      workersItems?.forEach((item) => {
       workers_user_id.push(item?.user?._id);
      });
    }
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
      convertion_rate:services_start.join(","),
      opt_a: services_id.join(","),
      opt_b: services_total_price.join(","),
      opt_c: services_expries_item.join(","),
      opt_d: workers_user_id.join(","),
      cus_country: "Bangladesh",
      success_url: `http://localhost:8000/api/payments/ammerpay/success/${traid_id}/${bookingId || 'null'}`,
      fail_url: `http://localhost:8000/api/payments/ammerpay/fail/${traid_id}`,
      cancel_url: `http://localhost:8000/api/payments/ammerpay/cancel/${traid_id}`,
      type: "json",
    };
    const { data } = await axios.post(
      ($url = "https://sandbox.aamarpay.com/jsonpost.php"),
      formData,
      { headers: { "Content-Type": "application/json" } }
    );
    if (data.result !== "true") {
      return res.status(400).json({
        flag: false,
        message: "payment fails",
      });
    }
    return res.status(201).json({
      flag: true,
      url: data.payment_url,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error + "see" + error,
    });
  }
};

///paymet success
exports.successPaymentControler = async (req, res) => {
  try {
    console.log(req.body);
    const bookingId = req.params.bookingId;
    const traidId = req.params.traidId;
    const sevices_id = req.body?.opt_a?.split(',');
    const services_total_price = req.body?.opt_b?.split(',');
    const services_expries_item = req.body?.opt_c?.split(',');
    const services_start = req.body?.convertion_rate.split(',');
    const workerId = req.body?.opt_d?.split(',');
    // const payment = await PaymentModel.findOne({ tran_id: req.params.traidId });
    if (bookingId) {
      const booking = await BookingModel.findById(bookingId);
      await PaymentModel.create({
        before_payment_id: booking?.paymentid,
        user: req.user._id,
        amount,
        tran_id: req.params.traidId,
      });
    } else {
      const payment = await PaymentModel.create({
        user: req.user._id,
        amount,
        tran_id: req.params.traidId,
      });
      if (payment) {
        const serviceList = [];
        let total_amount = 0;
        if (sevices_id?.length > 0) {
          for(let i=0; i<=sevices_id?.length;i++){
            const obj = {
              service: sevices_id[i],
              work_start_date: services_start[i],
              time_schedule:services_expries_item[i],
              price: services_total_price[i],
            };
            total_amount += services_total_price[i];
            serviceList.push(obj);
          }
        }
        const workerLists = [];
        if (workersItems?.length > 0) {
          workersItems.forEach((element) => {
            const obj = {
              user: element,
            };
            workerLists.push(obj);
          });
        }
        const booking = await BookingModel.create({
          username: req.body?.cus_name,
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
  } catch (error) {
    console.error("Error parsing raw body:", error.message);
    res.status(400).send("Invalid callback");
  }
};

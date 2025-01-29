const Permission = require("../models/permission");
const PermissionseederData = [
  {
    name: "admin-role-create",
  },
  {
    name: "admin-role-update",
  },
  {
    name: "admin-role-delete",
  },
  {
    name: "admin-role-lists"
  },
  /// end roles
  {
    name: "admin-permission-lists",
  },
  /// end permission
  {
    name: "worker-info-get",
  },
  {
    name: "worker-avatar-create",
  },
  {
    name: "worker-update",
  },
  {
    name: "worker-delete",
  },
  {
    name: "worker-status-update",
  },
  {
    name: "worker-lists",
  },
  ///end workers
  {
    name: "client-info-get",
  },
  {
    name: "client-single-notification-send",
  },
  {
    name: "client-group-notification-send",
  },
  {
    name: "client-delete",
  },
  {
    name: "client-lists",
  },
  /// end clients

  {
    name: "service-discount-edit",
  },
  {
    name: "service-create",
  },
  {
    name: "service-lists",
  },
  {
    name: "service-update",
  },
  {
    name: "service-delete",
  },

  /// end services
  {
    name: "service-category-create",
  },
  {
    name: "service-category-lists",
  },
  {
    name: "service-category-update",
  },
  {
    name: "service-category-delete",
  },
  ///end service categories
  {
    name: "notification-info-get",
  },
  {
    name: "notification-lists",
  },
  ///end notifications
  {
    name: "apply-worker-aprup",
  },
  {
    name: "apply-worker-lists",
  },
  ///end apply workers
  {
    name: "banner-create",
  },
  {
    name: "banner-lists",
  },
  {
    name: "banner-update",
  },
  {
    name: "banner-delete",
  },
  {
    name: "banner-active",
  },
  {
    name: "banner-image",
  },
  ///end banner
  {
    name: "invoices-balances-info-get",
  },
  {
    name: "invoices-balances-lists",
  },
  {
    name: "invoices-balances-delete",
  },
  ///end invoices-balances
  {
    name: "booking-info-get",
  },
  {
    name: "booking-lists",
  },
  {
    name: "booking-update",
  },
  {
    name: "booking-delete",
  },
  {
    name: "booking-add-workers",
  },

  /// end bookings
  {
    name: "home-pages-lists",
  },
  {
    name: "home-pages-video-update",
  },
  {
    name: "home-pages-apps-imges-create",
  },
  ///end home-pages

  {
    name: "admin-profile-lists",
  },
  {
    name: "admin-profile-update",
  },
  {
    name: "admin-profile-email-edit",
  },
  {
    name: "admin-profile-password-edit",
  },
];

const seedPermissionData = async () => {
    try {
      const existingData = await Permission.find({});
      if (existingData.length === 0) {
        await Permission.insertMany(PermissionseederData);
        console.log("Permission Seeder data successfully!");
      } else {
        console.log("Permission Seeder data already exists, skipping seed.");
      }
    } catch (error) {
      console.error("Error seeding slider data:", error.message);
    }
  };

module.exports = seedPermissionData;
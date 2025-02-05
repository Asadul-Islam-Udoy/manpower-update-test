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
  {
    name: "admin-give-permission"
  },
  {
    name: "admin-permission-lists"
  },

    /// end roles and permission
  {
    name: "division-lists"
  },
  {
    name: "district-lists"
  },
  {
    name: "upazila-lists"
  },
  /// end addresss
  {
    name: "worker-info-get",
  },
  {
    name:"worker-create"
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
  {
    name: "client-nid-verified",
  },
  /// end clients
  {
    name: "contract-lists",
  },
  {
    name: "contract-message-lists",
  },
  {
    name: "contract-message-delete",
  },
  /// end contracts 
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
    name: "client-notification-info-get",
  },
  {
    name: "client-notification-lists",
  },
  {
    name: "client-notification-delete",
  },
  {
    name: "client-notification-update",
  },
  ///end notifications
  {
    name: "apply-worker-aprup",
  },
  {
    name: "apply-worker-lists",
  },
  {
    name: "apply-worker-delete",
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
  {
    name: "banner-info",
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
  {
    name: "invoices-balances-lists-status",
  },
  {
    name: "invoices-balances-lists-method",
  },
  {
    name: "invoices-balances-update-payment-status",
  },
  ///end invoices-balances
  {
    name: "review-info",
  },
  {
    name: "review-delete",
  },
  /// end review
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
  {
    name: "booking-update-payment-status",
  },
  {
    name: "booking-payment-status-info",
  },
  {
    name: "booking-by-payment-info",
  },
  {
    name: "booking-payment-delete",
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
    name: "admin-lists",
  },
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
  {
    name: "admin-new-user-create",
  },
  {
    name:"admin-delete",
  }
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
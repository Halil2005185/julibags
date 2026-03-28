module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      breakpoints: null,
      actionOptions: {
        upload: {
          folder: "julibags",
          use_filename: true,
          unique_filename: true,
          overwrite: false,
        },
        uploadStream: {
          folder: "julibags", // ← أضف هذا
          use_filename: true,
          unique_filename: true,
          overwrite: false,
        },
        delete: {
          invalidate: true, // ← أضف هذا
        },
      },
    },
  },
});

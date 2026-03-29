module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: "cloudinary",
            providerOptions: {
                cloud_name: env("CLOUDINARY_NAME"),
                api_key: env("CLOUDINARY_KEY"),
                api_secret: env("CLOUDINARY_SECRET"),
            },
            actionOptions: {
                upload: {
                    folder: "julibags",
                    use_filename: true,
                    unique_filename: true,
                    overwrite: false,
                },
                uploadStream: {
                    folder: "julibags",
                    use_filename: true,
                    unique_filename: true,
                    overwrite: false,
                },
                delete: {
                    invalidate: true,
                },
            },
        },
        breakpoints: {   // ← هنا الصح
            xlarge: null,
            large: null,
            medium: null,
            small: null,
            xsmall: null,
        },
    },
})
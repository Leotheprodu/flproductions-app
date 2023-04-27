// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  serverRuntimeConfig: {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'flproductionscr.com',
          port: '',
          pathname: '*',
        },
      ],
    }
  }
}
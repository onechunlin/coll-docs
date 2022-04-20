import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1631334350186_1296";

  // add your egg config in here
  config.middleware = ["auth"];

  // add your special config in here
  const bizConfig = {
    mongoose: {
      client: {
        url: "mongodb+srv://admin:admin@cluster0.er3fd.mongodb.net/BasicDataBase?retryWrites=true&w=majority",
        options: {},
        plugins: [],
      },
    },
    jwt: {
      secret: "123456",
    },
    cors: {
      credentials: true,
      origin: "http://localhost:8000",
    },
    security: {
      csrf: {
        headerName: "x-csrf-token", // 自定义请求头
        ignore: ["/api/user/login", "/api/user/register"],
      },
    },
    auth: {
      ignore(ctx) {
        return (
          ctx.url.startsWith("/api/user/login") ||
          ctx.url.startsWith("/api/user/register") ||
          ctx.url.startsWith("/api/user/userInfo")
        );
      },
    },
    io: {
      init: {
        pingInterval: 1000,
        cors: {
          credentials: true,
          origin: "http://localhost:8000",
        },
      },
      namespace: {
        "/io/doc": {
          connectionMiddleware: ["auth"],
          packetMiddleware: [],
        },
      },
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};

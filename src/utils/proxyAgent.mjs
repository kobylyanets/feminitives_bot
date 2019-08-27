import ProxyAgent from "proxy-agent";

const proxyUri = `${process.env.PROXY_PROTOCOL}://${process.env.PROXY_LOGIN}:${process.env.PROXY_PSSWD}@${process.env.PROXY_HOST}:${process.env.PROXY_PORT}`;

export const proxyAgent = new ProxyAgent(proxyUri);

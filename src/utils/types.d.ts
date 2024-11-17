/**
 * 模板信息类型
 */
export type TemplateInfo = {
  name?: string; // 模板名称
  url?: string; // 模板下载地址
  branch?: string; // 下载分支名称
  description?: string; // 模板描述
};

/**
 * 加载动画配置类型
 */
export type LoadingOptions = {
  text?: string; // 提示文本
  cb: Function; // 回调函数
  maxRetries?: number; // 最大重试次数
  retryDelay?: number; // 重试间隔时间
  okText?: string; // 成功提示文本
  failureText?: string; // 失败提示文本
};

/**
 * 创建项目配置类型
 */
export type CreateOptions = {
  force?: boolean; // 是否强制覆盖
  template?: string; // 模板名称或URL地址
  branch?: string; // 下载分支名称
};

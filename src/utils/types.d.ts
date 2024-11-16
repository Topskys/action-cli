/**
 * 模板信息类型
 */
export type TemplateInfo = {
  name: string; // 模板名称
  downloadUrl: string; // 模板下载地址
  branch: string; // 分支名称
  description?: string; // 模板描述
};

/**
 * 加载动画配置类型
 */
export type LoadingOptions = {
  message?: string; // 提示文本
  cb: Function; // 回调函数
  maxRetries?: number; // 最大重试次数
  retryDelay?: number; // 重试间隔时间
  succeedMessage?: string; // 成功提示文本
  failMessage?: string; // 失败提示文本
};

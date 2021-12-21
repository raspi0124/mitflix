import Vue from "vue";
import sanitizeHTML from "sanitize-html";
//追加で以下のタグattr等を許可
sanitizeHTML.defaults.allowedAttributes.span = ["style", "class"];
sanitizeHTML.defaults.allowedAttributes.h1 = ["style", "class"];
sanitizeHTML.defaults.allowedAttributes.h2 = ["style", "class"];
sanitizeHTML.defaults.allowedAttributes.strong = ["style", "class"];
sanitizeHTML.defaults.allowedAttributes.sub = ["style", "class"];
sanitizeHTML.defaults.allowedAttributes.em = ["style", "class"];
sanitizeHTML.defaults.allowedAttributes.u = ["style", "class"];
sanitizeHTML.defaults.allowedAttributes.s = ["style", "class"];
sanitizeHTML.defaults.allowedAttributes.blockquote = ["style", "class"];
sanitizeHTML.defaults.allowedAttributes.video = ["src"];
sanitizeHTML.defaults.allowedAttributes.iframe = [
  "src",
  "title",
  "class",
  "allowfullscreen",
  "frameborder"
];
sanitizeHTML.defaults.allowedAttributes.img = ["src"];
sanitizeHTML.defaults.allowedIframeHostnames = ["www.youtube.com"];
sanitizeHTML.defaults.allowedTags.push("video");
sanitizeHTML.defaults.allowedTags.push("iframe");
sanitizeHTML.defaults.allowedTags.push("img");
Vue.prototype.$sanitize = sanitizeHTML;

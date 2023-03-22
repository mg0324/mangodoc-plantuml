import plantumlEncoder from "plantuml-encoder";
import $ from "jquery";

const plantumlServer = "http://www.plantuml.com/plantuml";
let type = "img";
export default {
    afterEach(html,next){
        // console.info("[mangodoc-plantuml] afterEach");
        let $html = $("<div>"+html+"</div>");
        let codes = $html.find("code.language-plantuml");
        codes.each(function() {
            var content = $(this).html();
            content = handleContent(content);
            var encoded = plantumlEncoder.encode(content);
            if(window.$mangodoc.plantuml && window.$mangodoc.plantuml.type){
                type = window.$mangodoc.plantuml.type;
            }
            var data = plantumlServer + "/"+type+"/" + encoded;
            var objEl = `<img src="${data}"/>`;
            if(type == "svg"){
                objEl = `<object type="image/svg+xml" data="${data}" />`;
            }
            $(this).parent().replaceWith($(objEl));
        });
        html = $html.html();
        next(html);
    }
}

function handleContent(content){
    content = content.replaceAll("&lt;","<");
    content = content.replaceAll("&gt;",">");
    return content;
}
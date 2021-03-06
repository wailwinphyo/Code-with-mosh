var jq = document.createElement('script');
jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
jQuery.noConflict();

var startIndex = 0; var endIndex = 0;
var links = $("ul.section-list a.item");
var data_obj = {};
$("ul.section-list a.item").each(function(i ,obj){
    var sec_name = $(this).parents(".course-section").find(".section-title").text().replace(/\:/igm, ".").trim();
    var lecture_id = $(this).attr("id");
    var lecture_name = $(this).find(".lecture-name").text().replace(/(\r\n|\n|\r)\s*/igm, " ").trim();
    var obj = {
        id : i,
        sec_name : sec_name,
        lecture_name : lecture_name,
        getName : function(){
            return `${this.id}. ${this.sec_name}`;
        }
    }
    data_obj[`${lecture_id}`] = obj;
});
console.log("Lecture Map constructed");
console.log(data_obj);
console.log("Downloading Started");

var i = startIndex * 2;
endIndex = endIndex == 0 ? links.length : endIndex;
function myFunc(){
    setTimeout(function(){
        var index = Math.floor(i/2);
        if(index <= endIndex){
            if (i % 2 == 0){
                links[index].click();
                myFunc();
            } else {
                $("a.download").attr("data-x-origin-download-name", data_obj[`${links[index].id}`].getName() + " - " + $("a.download").attr("data-x-origin-download-name"));
                console.log( $("a.download").attr("data-x-origin-download-name"));
                var downloadBtn = document.querySelector("a.download");
                if(downloadBtn != null) downloadBtn.click();
                myFunc();
            }
            ++i;
        } else {
            console.log(" ----- Finished Downloading ----- ");
        }
    }, 10000);
}
myFunc();
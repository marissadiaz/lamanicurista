//Archivo de busqueda en pagina simple para hacer notar la dependencia de herarquias en arquitectura

jQuery("#search_submit").on("click", function () {
    var search_str = jQuery("#search_text").val();console.log(search_str);
    findString(search_str);
    return false;
});

var TRange=null;

function findString (str) {
    // Super basica busqueda aprovecha funciones incluidas navegador
    if (parseInt(navigator.appVersion)<4) return;
    var strFound;
    if (window.find) {

        var original_content = window;
        strFound=original_content.find(str);
        if (!strFound) {
            strFound=original_content.find(str,0,1);
            while (original_content.find(str,0,1)) continue;
        }
    }
    // Tomar en cuenta limitaciones de navegadores que no soportan find(str)

    else if (navigator.appName.indexOf("Microsoft")!=-1) {

        if (TRange!=null) {
            TRange.collapse(false);
            strFound=TRange.findText(str);
            if (strFound) TRange.select();
        }
        if (TRange==null || strFound==0) {
            TRange=self.document.body.createTextRange();
            strFound=TRange.findText(str);
            if (strFound) TRange.select();
        }
    }
    
    if (!strFound) alert ("String '"+str+"' not found!")
    return;
}

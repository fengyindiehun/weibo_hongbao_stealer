var hongbao_fetched = {};

function fetch_hongbao(hongbao_id) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.onreadystatechange = function(data) {
      if (xhr.readyState == 4) {
        console.log('status:' + xhr.status);
        if (xhr.status == 200) {
          //var dataText = translateXML(xhr.responseXML);
          //if(dataText != null)
          //	callback(dataText);
        } else if (xhr.status == 302) {
            var result = xhr.responseText;
            console.log(result);
        } else {
        }
      }
    }
    var url = 'http://mall.e.weibo.com/redenvelope/draw?set_id=' + hongbao_id;
    xhr.open('GET', url, true);
    xhr.send();

    hongbao_fetched[hongbao_id] = 1;
    console.log("fetch hongbao:" + hongbao_id);
}

function OnMessageCome(event) {
    var dialog = event.target.innerHTML;
    var urls = dialog.match(/mall.e.weibo.com\/redenvelope\/draw\?set_id=[0-9]*/g);
    if (urls == null) return;

    for (var i = 0; i < urls.length; ++i) {
        var pos = urls[i].indexOf('set_id=');
        var hongbao_id = urls[i].substring(pos + 7);

        console.log(hongbao_id);
        if (hongbao_id in hongbao_fetched) {
            continue;
        }

        console.log('ready to fetch hongbao:' + hongbao_id);
        fetch_hongbao(hongbao_id);
    }
}

var node = (document.getElementsByClassName('private_dialogue_cont'))[0];
node.addEventListener('DOMNodeInserted', OnMessageCome, false);


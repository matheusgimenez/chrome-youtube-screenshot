var url = window.location.href;
var isYoutube = url && url.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);

if(isYoutube){

  var w,h,downloadCanvas,previewCanvas,popup,ratio,shadowRoot;

  function checkQuality(){
    var boolean = document.getElementsByClassName("ytp-panel-menu")[0].lastChild != null;
    return boolean;
  };

  function getQuality(){
    if(checkQuality()){
      return document.getElementsByClassName("ytp-panel-menu")[0].lastChild.children[1].children[0].children[0].childNodes[0].data;
    }
  }

  function setQuality(){
      console.log("Quality:", getQuality());
      switch (getQuality()) {
        case '4320p':
        case '4320p60':
            w = 7680; h = 4320;
          break;
        case '2160p':
        case '2160p60':
            w = 3860; h = 2160;
          break;
        case '1080p':
        case '1080p60':
            w = 1920; h = 1080;
          break;
        case '720p':
        case '720p60':
            w = 1280; h = 720;
          break;
        case '480p':
            w = 720; h = 480;
          break;
        case '360p':
            w = 640; h = 360;
          break;
        case '240p':
            w = 352; h = 240;
          break;
        case '144p':
            w = 256; h = 144;
          break;
        default:
            w = 1280; h = 720;
        break;
      }
  }

  function createButton(){
    var container = document.getElementsByClassName('ytp-right-controls')[0];
    var button = document.createElement('button');
    button.id = "saademotion-youtube-screenshot-button";
    button.className = "ytp-button saademotion-youtube-screenshot-button";
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="100%" viewBox="-7 -7 36 36"> <path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/> <path d="M0 0h24v24H0V0z" fill="none"/> <path d="M12 17l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z"/> </svg>';
    container.appendChild(button);
  }

  function createPopup(){
    popup = document.createElement('div');
    popup.innerHTML = '<button class="ytp-button" id="saademotion-youtube-screenshot-popup_close_button" style="position: absolute; top: 10px; left: 10px; width: 40px; z-index: 9999999999;"><svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" height="36" viewBox="0 0 24 24" width="36"> <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/> <path d="M0 0h24v24H0z" fill="none"/> </svg></button><div class="saademotion-youtube-screenshot-popup_bottom_info" style="position: absolute; bottom: 0; color: #fff; padding: 10px; background: #ff0041; width: 100%; opacity: 1; font-weight: bolder; text-transform: uppercase; box-sizing: border-box;">Para melhor qualidade da imagem, selecione a qualidade máxima possível no youtube. <span style="float:right;">| SaadeMotion |</span></div>';
    popup.id = 'saademotion-youtube-screenshot-popup';
    popup.style.height = "auto";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%,-50%)";
    popup.style.zIndex = "999999999999999";
    popup.style.display = "none";
    popup.style.overflow = "hidden";
    popup.style.borderRadius = "5px";
    body.appendChild(popup);
  }

  function createPreviewCanvas(){
    previewCanvas = document.createElement('canvas');
    previewCanvas.id = 'saademotion-youtube-screenshot-preview--canvas';
    previewCanvas.width = 1920;
    previewCanvas.height = 1080;
    popup.appendChild(previewCanvas);
  }

  function createDownloadCanvas(){
    downloadCanvas = document.createElement('canvas');
    downloadCanvas.id = 'saademotion-youtube-screenshot-download--canvas';
    downloadCanvas.width = w;
    downloadCanvas.height = h;
    downloadCanvas.style.position = "absolute";
    downloadCanvas.style.top = "50%";
    downloadCanvas.style.left = "50%";
    downloadCanvas.style.transform = "translate(-50%,-50%)";
    downloadCanvas.style.opacity = "0";
    popup.appendChild(downloadCanvas);
  }

  function createShadowRoot(){
    shadowRoot = document.createElement('div');
    shadowRoot.id = 'saademotion-youtube-screenshot-download--shadow_root';
    shadowRoot.style.width = "100vw";
    shadowRoot.style.height = "100vh";
    shadowRoot.style.background = "rgba(0,0,0,.7)";
    shadowRoot.style.position = "fixed";
    shadowRoot.style.top = "0";
    shadowRoot.style.left = "0";
    shadowRoot.style.zIndex = "999999999";
    shadowRoot.style.display = "none";
    body.appendChild(shadowRoot);
  }

  (document.getElementById("saademotion-youtube-screenshot-button") != null)? true : createButton();
  (document.getElementById("saademotion-youtube-screenshot-popup") != null)? true : createPopup();
  (document.getElementById("saademotion-youtube-screenshot-preview--canvas") != null)? true : createPreviewCanvas();
  (document.getElementById("saademotion-youtube-screenshot-download--canvas") != null)? true : createDownloadCanvas();
  (document.getElementById("saademotion-youtube-screenshot-download--shadow_root") != null)? true : createShadowRoot();

  function updateAll(){
    var ww = window.innerWidth;
    var wh = window.innerHeight;

    if(w < ww){
      popup.style.width = w;
    }else{
      popup.style.width = "80vw";
    }

    downloadCanvas.width = w;
    downloadCanvas.height = h;
    previewCanvas.width = w;
    previewCanvas.height = h;
  }

  var video = document.querySelector('video');
  var previewContext = previewCanvas.getContext('2d');
  var downloadContext = downloadCanvas.getContext('2d');

  document.getElementById("saademotion-youtube-screenshot-button").addEventListener("click", function(){

    setQuality();
    updateAll();

    previewContext.fillRect(0,0,w,h);
    previewContext.drawImage(video,0,0,w,h);

    downloadContext.fillRect(0,0,w,h);
    downloadContext.drawImage(video,0,0,w,h);

    previewCanvas.style.width = "100%";
    popup.style.display = "block";
    shadowRoot.style.display = "block";
  });

  document.getElementById("saademotion-youtube-screenshot-popup_close_button").addEventListener("click", function(){
    popup.style.display = "none";
    shadowRoot.style.display = "none";
  });

}

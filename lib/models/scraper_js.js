
// ==UserScript==
// @name         movie/tv site direct link redirector/downloader
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  cool
// @author       You
// @match        http*://movcloud.net/embed/*
// @match        http*://www.movcloud.net/embed/*
// @match        http*://cloud9.to/embed/*
// @match        http*://www.cloud9.to/embed/*
// @match        http*://vidcloud9.com/videos/*
// @match        http*://vidnode.net/videos/*
// @match        http*://vidnext.net/videos/*
// @match        http*://vidstreaming.io/videos/*
// @match        http*://vidcloud9.com/streaming.php?*
// @match        http*://vidcloud9.com/load.php?*
// @match        http*://vidnode.net/streaming.php?*
// @match        http*://vidnode.net/load.php?*
// @match        http*://vidnext.net/streaming.php?*
// @match        http*://vidnext.net/load.php?*
// @match        http*://vidstreaming.io/streaming.php?*
// @match        http*://vidstreaming.io/load.php?*
// @match        http*://www.vidcloud9.com/videos/*
// @match        http*://www.vidnext.net/videos/*
// @match        http*://www.vidnode.net/videos/*
// @match        http*://www.vidstreaming.io/videos/*
// @match        http*://www.vidcloud9.com/streaming.php?*
// @match        http*://www.vidcloud9.com/load.php?*
// @match        http*://www.vidnode.net/streaming.php?*
// @match        http*://www.vidnode.net/load.php?*
// @match        http*://www.vidnext.net/streaming.php?*
// @match        http*://www.vidnext.net/load.php?*
// @match        http*://www.vidstreaming.io/streaming.php?*
// @match        http*://www.vidstreaming.io/load.php?*
// @match        http*://gogo-stream.com/videos/*
// @match        http*://gogo-stream.com/streaming.php?*
// @match        http*://gogo-stream.com/load.php?*
// @match        http*://www.gogo-stream.com/videos/*
// @match        http*://www.gogo-stream.com/streaming.php?*
// @match        http*://www.gogo-stream.com/load.php?*
// @match        http*://database.gdriveplayer.me/google.php?*
// @match        http*://database.gdriveplayer.me/player.php?*
// @match        http*://databasegdriveplayer.me/google.php?*
// @match        http*://databasegdriveplayer.me/player.php?*
// @match        http*://database.gdriveplayer.io/google.php?*
// @match        http*://database.gdriveplayer.io/player.php?*
// @match        http*://databasegdriveplayer.io/google.php?*
// @match        http*://databasegdriveplayer.io/player.php?*
// @match        http*://database.gdriveplayer.us/google.php?*
// @match        http*://database.gdriveplayer.us/player.php?*
// @match        http*://databasegdriveplayer.us/google.php?*
// @match        http*://databasegdriveplayer.us/player.php?*
// @match        http*://databasegdriveplayer.xyz/google.php?*
// @match        http*://databasegdriveplayer.xyz/player.php?*
// @match        http*://databasegdriveplayer.co/google.php?*
// @match        http*://databasegdriveplayer.co/player.php?*
// @match        http*://www.playhydrax.com/*
// @match        http*://play.hydracdn.network/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
 
const base_url = '';

(async function() {
    'use strict';
 
    //in order to download hydrax videos, you must use a header changing extension
    //i recommend simple-modify-header:
    //firefox: https://addons.mozilla.org/en-US/firefox/addon/simple-modify-header
    //chrome: https://chrome.google.com/webstore/detail/gjgiipmpldkpbdfjkgofildhapegmmic
    //import this config: https://pastebin.com/dl/VfZGYwJW
    //and press the start button
    //then you can change the below variable to true :)
    //!!NOTE!!: make sure you turn off the header changer extension because it currently wildcards ALL .monster domains
    var justDownloadHydrax=false;//UPDATE: i recommend to instead just right click video->"Save video as..." (works in firefox, not yet tested in chrome)
 
    var corsproxy="https://proxy.iamcdn.net/sub?url=";
 
    var gdriveplayerhosts=["database.gdriveplayer.me","databasegdriveplayer.me","database.gdriveplayer.io","databasegdriveplayer.io","database.gdriveplayer.us","databasegdriveplayer.us","databasegdriveplayer.xyz","databasegdriveplayer.co"],
        movcloudhosts=["www.movcloud.net","movcloud.net","www.cloud9.to","cloud9.to"],
        vidcloudhosts=["vidcloud9.com","vidnode.net","vidnext.net","vidstreaming.io","gogo-stream.com"];
    async function sleep(t){
        return await new Promise(r=>setTimeout(r,t));
    }
    if(base_url=='playhydrax.com'||base_url.endsWith('.playhydrax.com')/*base_url=='play.hydracdn.network'||base_url.endsWith('.play.hydracdn.network')*/){
        document.cookie="isNoAds=true;path=/";
        if(top.location==self.location){
            document.close();
            document.open();
            document.write(`<body bgcolor="black"><iframe src="${window.location.href}" style="position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;padding:0;margin:0;border:0;z-index:99999;"></iframe></body>`);
            document.close();
            return;
        }
        var vidEl=document.querySelector("video");
        for(var i=0;i<10000&&(!vidEl||!vidEl.hasAttribute("src"));i++){
            vidEl=document.querySelector("video");
            await sleep(1);
        }
        var vidUrl=vidEl.src;
        document.close();
        document.open();
        document.write(`<body bgcolor="black"><video src="${vidUrl}" style="position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;padding:0;margin:0;border:0;z-index:99999;" controls></video>${justDownloadHydrax?`<a src="${vidUrl}" download="hydrax.mp4">download</a>`:``}</body>`);
        document.close();
        /*
        document.close();
        document.open();
        document.write(`<script>var urll,slug,isdone=false;slug=window.location.search.indexOf('v=')?window.location.search.match(/[?&]v=([^&]+)/)[1]:alert('error: video id not specified');var fd=new FormData();fd.append('slug',slug);var data=new URLSearchParams(fd);fetch('https://ping.idocdn.com',{method:'post',body:data}).then(d=>d.json()).then(res=>{if(!res.status)return alert('error: video id not found');urll=res.url;fetch('https://'+urll,{method:'post',body:data}).then(()=>{document.querySelector('img').src='https://ping.'+urll+'/ping.gif'});});</script>
                        <img onload="${justDownloadHydrax?`var a=document.querySelector('a');a.download=slug+'.mp4';a.href='https://www.'+urll;a.click();`:`document.querySelector('video').src='https://www.'+urll;`}"/><!--"www." makes the video HD-->
                        <video style="position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;padding:0;margin:0;border:0;z-index:99999;" controls></video>
                        ${justDownloadHydrax?`<a download="hydrax.mp4">download</a>`:``}
                       `);
        document.close();
        */
    }else{
        window.addEventListener("DOMContentLoaded",async function(){
            function endsWithAny(str,arr){
                for(var item in arr){
                    if(str.endsWith(item))return true;
                }
                return false;
            }
            if(gdriveplayerhosts.includes(base_url)||endsWithAny(base_url,gdriveplayerhosts))(new Function('eval',document.querySelectorAll("body script")[1].innerText))(function(a){
                var b=[a.slice(0,a.indexOf(';')+1),a.slice(a.indexOf(';')+1)];
                b[1]='ae'+b[1].slice(b[1].indexOf('()')+2);
                (new Function('ae',b[1]))({document:{write:function(c){
                    c=c.replace('<script>','').replace('</script>','').trim();
                    (new Function('eval',b[0]+c))(function(e){
                        (new Function('eval','player',e))(function(f){
                            var urls=f.split("{sources:[").slice(1),
                                url=f.slice(f.indexOf("if(countcheck=='")+16);
                            function finishurls(ur,i){
                                var urr=eval(ur.slice(0,ur.indexOf("]")+1).replace(/"\+countcheck\+"/g,i));
                                return urr[urr.length-1].file;
                            }
                            urls=urls.map((r,i)=>finishurls("["+r,i));
                            urls.push(eval(url.slice(url.indexOf("{jwplayer().remove();window.location='")+37,url.indexOf("}"))));
                            urls=urls.map(j=>(new URL(j,window.location.href)).href);
                            document.close();
                            document.open();
                            document.write(`<body bgcolor="black"><script>var urls=JSON.parse(atob('${btoa(JSON.stringify(urls))}'));function errhandl(v){if(v.currentSrc==urls[urls.length-1])window.location.href=v.currentSrc;}</script><video controls style="position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;padding:0;margin:0;border:0;z-index:99999;">${urls.map(k=>'<source src="'+k+'"></source>').join("")}</video><script>document.querySelector("video").addEventListener('error',function(e){errhandl(this);},true);</script></body>`);
                            document.close();
                        },function(){});
                    });
                }}});
            });
            function corsplayer(){
                document.close();
                document.open();
                var vidurl=window.location.hash.slice(12);
                document.write(`<body bgcolor="black"><video controls style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:999;"></video></body>`);
                document.close();
                var v=document.querySelector("video");
                v.onerror=function(){
                    var hlsjs=document.createElement('script');
                    hlsjs.onload=function(){
                        if(Hls.isSupported()){
                            var hls=new Hls();
                            hls.loadSource(v.src);
                            hls.attachMedia(v);
                        }
                    };
                    hlsjs.src='https://cdn.jsdelivr.net/npm/hls.js@latest';
                    document.querySelector('head').appendChild(hlsjs);
                };
                v.src=vidurl;
            }
            if(movcloudhosts.includes(base_url)&&window.location.pathname.startsWith("/embed/")&&window.location.search==""&&window.location.hash.startsWith("#corsplayer:")){
                corsplayer();
            }
            if(vidcloudhosts.includes(base_url.split(".").slice(-2).join("."))){
                if(base_url.startsWith("www."))return base_url=base_url.slice(4);
                if(window.location.pathname.startsWith("/videos/")){
                    if(window.location.search==""&&window.location.hash.startsWith("#corsplayer:")){
                        corsplayer();
                    }else{
                        async function checkStatusOfMp4(url){
                            try{
                                var tmpv=document.createElement("video"),
                                    status=0;
                                tmpv.onloadedmetadata=function(){
                                    status=200;
                                    concludeStatus();
                                };
                                tmpv.onerror=function(){
                                    //empty string=cors error (which is why cors proxy is used for non firefox)
                                    status=(tmpv.error.code==4&&(tmpv.error.message.toLowerCase().includes("decoder")||tmpv.error.message.toLowerCase().includes("demuxer")||tmpv.error.message==""))?200:404;
                                    concludeStatus();
                                };
                                tmpv.src=(navigator.userAgent.toLowerCase().includes('firefox')?"":corsproxy)+url;
                                function concludeStatus(){
                                    tmpv.remove();
                                }
                                for(var i=0;i<10000&&(status==0);i++)await sleep(1);
                                if(status==0)status=404;
                                return status;
                            }catch(e){return 404;}
                        }
                        try{
                            var ifr=document.querySelector("iframe"),
                                origsrc=ifr.src,
                                sources=await (await fetch("https://"+base_url+"/ajax.php"+origsrc.split(".php")[1],{headers:{"X-Requested-With":"XMLHttpRequest"}})).json(),
                                allurls=[],
                                vidurl="",
                                vidHost="";
                            ifr.src="";
                            if("source" in sources&&Array.isArray(sources.source))allurls=allurls.concat(sources.source);
                            if("source_bk" in sources&&Array.isArray(sources.source_bk))allurls=allurls.concat(sources.source_bk);
                            for(var i=0;i<allurls.length&&vidurl=="";i++){
                                try{
                                    var currUrl=allurls[i];
                                    if('file' in currUrl&&typeof currUrl.file=="string"&&!["null","undefined",""].includes(currUrl.file.replace(/\s/g,""))){
                                        var tryfetch=0;
                                        try{tryfetch=(await fetch(currUrl.file,{method:"HEAD",mode:"cors"})).status;}catch(e){}
                                        if(tryfetch<310||(await checkStatusOfMp4(currUrl.file))==200){
                                            vidurl=currUrl.file;
                                            //break;
                                        }
                                    }
                                }catch(e){}
                            }
                            if(vidurl==""&&"linkiframe" in sources&&typeof sources.linkiframe=="string"&&sources.linkiframe!=""){
                                var ifrurl=sources.linkiframe,
                                    ifrurlparsed=new URL(ifrurl);
                                switch(ifrurlparsed.hostname){
                                    case "movcloud.net":
                                    case "www.movcloud.net":
                                    case "cloud9.to":
                                    case "www.cloud9.to":
                                        var unjsondata=await fetch(corsproxy+"https://api."+ifrurlparsed.hostname.replace(/^www\./,"")+"/stream"+ifrurlparsed.pathname.slice(6)),
                                            jsondata={};
                                        try{
                                            jsondata=await unjsondata.json();
                                            var moreurls=[];
                                            if("success" in jsondata&&jsondata.success&&"data" in jsondata&&"sources" in jsondata.data&&Array.isArray(jsondata.data.sources)&&jsondata.data.sources.length>0){
                                                moreurls=moreurls.concat(jsondata.sources);
                                                for(var i=0;i<moreurls.length&&vidurl=="";i++){
                                                    try{
                                                        var currItem=jsondata.data.sources[i];
                                                        if("file" in currItem&&typeof currItem.file=="string"&&!["null","undefined",""].includes(currItem.file.replace(/\s/g,""))){
                                                            if((await checkStatusOfMp4(currItem.file))==200){
                                                                vidHost=ifrurl;
                                                                vidurl=currItem.file;
                                                                //break;
                                                            }
                                                        }
                                                    }catch(e){}
                                                }
                                            }
                                        }catch(e){
                                            //not found
                                            break;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            }
                            ifr.src=vidurl==""?origsrc:(vidHost+"#corsplayer:"+vidurl);
                        }catch(e){
                            console.log(e);
                        }
                    }
                }else{
                    document.querySelectorAll('li.linkserver').forEach(e=>{
                        var xd=e.innerText.toLowerCase();
                        if(xd.includes('hydrax')||xd.includes('hyrax'))location.href=e.dataset.video.replace('hydrax.net','playhydrax.com');//.replace('playhydrax.com','play.hydracdn.network');
                    });
                }
            }
        });
    }
})();
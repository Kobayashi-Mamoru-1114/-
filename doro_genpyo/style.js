{
  options:{
    attribution: '',minZoom: 2,maxNativeZoom: 2, maxZoom: 18, styletype:"canvas",
  },
  geojsonOptions:{
    //以下、地図上への表示設定
    pointToLayer: function(feature, latlng){
      //拡大時のみ地図上に名称を表示するための設定
      var meisho = this.dealer;
      switch (true) {
        case (GSI.GLOBALS.map.getZoom() < 11):
          meisho = "";
          break;
        default:
          meisho = feature.properties["市町村等"];
      };
        //地図上への表示内容（色・フォントなど）
        return L.marker(latlng, {
          icon: L.divIcon({
            iconAnchor: [7 ,10],
            className : "gsi-div-icon",
            html: "<div style='"
              + "font-family: sans-serif;"
              + "font-size:14px;"
              + "display:inline;"
              + "color:rgb(164,0,53);"
              + "line-height:16px;"
              + "'>" + "●"  
              + "</div>"
              + "<div style='"
              + "font-family: BIZ UDGothic, sans-serif;"
              + "font-size:16px;"
              + "font-weight:bold;"
              + "background-color:rgba(255,255,255,0.5);"
              + "display:inline;"
              + "color:rgb(164,0,53);"
              + "line-height:16px;"
              + "'>" + meisho + "</div>"
            })
          });
        },
    //以下、ポップアップの設定
    onEachFeature: function (feature, layer){
      var s = "<table>";
        //タイトル
        s += "<tr><th colspan='2' style='font-size:16px; font-weight:bold; color:#000000; font-family:BIZ UDPGothic, sans-serif;'>" + feature.properties["名前"]  + "</th></tr>";
        //表示設定（色やフォント）
        var cssl = "<tr><td style='vertical-align:middle; font-size:14px; color:#0000ff; font-family:BIZ UDPGothic, sans-serif; white-space:nowrap;'>";
        var cssr = "<td style='font-size:14px; color:#000000;'>"; 
        //表示内容
        s += cssl + "都道府県" + "</td>"
               + cssr + String(feature.properties["都道府県"]).replace("undefined","") + "</td></tr>";
        s += cssl + "郡市" + "</td>"
               + cssr + String(feature.properties["郡市"]).replace("undefined","") + "</td></tr>";
        s += cssl + "市町村等" + "</td>"
               + cssr + String(feature.properties["市町村等"]).replace("undefined","") + "</td></tr>";
        s += cssl + "現況" + "</td>"
               + cssr + String(feature.properties["現況"]).replace("undefined","") + "</td></tr>";
        s += cssl + "備考等" + "</td>"
               + cssr + String(feature.properties["備考等"]).replace("undefined","") + "</td></tr>";
        //リンク（グーグルマップ&ストリートビュー）
        s += "<tr><th colspan='2' style='font-size:14px; font-weight:normal; color:#000000; font-family:BIZ UDPGothic, sans-serif;'>" 
           + 'Google' 
           + '<a href="https://www.google.com/maps/@?api=1&map_action=pano&parameters&viewpoint=' + feature.geometry["coordinates"][1] + ',' + feature.geometry["coordinates"][0] + '"' + 'target="_blank">ストリートビュー</a>' 
           + ' ／ '
           + '<a href="https://www.google.co.jp/maps/@' + feature.geometry["coordinates"][1] + ',' + feature.geometry["coordinates"][0] + ',464m/data=!3m1!1e3' + '"' + 'target="_blank">マップ</a>' 
           + "</th></tr>";
        //リンク（グーグルフォーム・使用するならば修正して"//"を取る）
        //s += "<tr><th colspan='2' style='font-size:14px; font-weight:normal; color:#000000; font-family:BIZ UDPGothic, sans-serif;'>"  
        //  + '<a href="https://docs.google.com/forms/d/e/1FAIpQLSd4Q4wm50oyE6AWPY0F_3cZRrnVi0vWKea-qY2DSlY-A8zO9A/viewform?entry.2053352869=' + String(feature.properties["No14"]).replace("undefined","") + '&entry.35459926=' + feature.properties["_html"] + '"' + 'target="_blank">報告</a>（位置の誤り）'
        //  + "</th></tr>";
        s += "</table>";
      layer.bindPopup(s);
    }
  }
}
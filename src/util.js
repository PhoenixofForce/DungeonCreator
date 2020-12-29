import { dungeon } from './stores.js';
export { importDungeon, exportDungeon };

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function exportDungeon(dungeon) {
  let d = JSON.parse(JSON.stringify(dungeon));

  let maxX;
  let maxY;

  for(let i in d.rects) {
    let r = d.rects[i];

    if(!maxX || (maxX && r.x > maxX)) maxX = r.x;
    if(!maxY || (maxY && r.y > maxY)) maxY = r.y;
  }


  for(let i in d.rects) {
    let r = d.rects[i];

    r.x -= maxX;
    r.y -= maxY;
  }

  for(let i in d.doors) {
    let r = d.doors[i];

    r.x -= maxX;
    r.y -= maxY;
  }

  download("map.json", JSON.stringify(d));
}


function importDungeon(binfile) {
  let reader = new FileReader(binfile);
  reader.onload = function(evt) {
      let dung = JSON.parse(reader.result);

      let minX = 0;
      let minY = 0;

      let hover = {x: 0, y: 0, w: 1, h: 1};

      for(let i in dung.rects) {
        let room = dung.rects[i];

        if(room.x < minX) minX = room.x
        if(room.y < minY) minY = room.y
      }

      minX -= 1;
      minY -= 1;

      for(let i in dung.rects) {
        let room = dung.rects[i];

        room.x -= minX;
        room.y -= minY;
      }

      for(let i in dung.doors) {
        let room = dung.doors[i];

        room.x -= minX;
        room.y -= minY;
      }

      dungeon.update(g => {
        return dung;
      });
  }

  reader.readAsText(binfile);
}

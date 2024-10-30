import hljs from 'highlight.js';
import '/node_modules/highlight.js/styles/idea.min.css';

const globelData = {
  fileList: []
}

document.getElementById('j-readfile-btn').addEventListener('click', onClickReadFile);

document.getElementById('j-readfolder-btn').addEventListener('click', onClickReadFolder);

async function onClickReadFile() {
  const result = await window.showOpenFilePicker();
  const fileContent = await result[0].getFile();
  readFileContent(fileContent)
}

async function onClickReadFolder() {
  const result = await window.showDirectoryPicker();
  for await (const data of result.values()) {
    globelData.fileList.push(data);
  }
  initFileTree(globelData.fileList)
}

function readFileContent(content) {
  const fs = new FileReader();
  fs.onload = () => {
    document.getElementById('j-codeContent').innerHTML = hljs.highlightAuto(
      fs.result
    ).value;
  };
  fs.readAsText(content);
}

function initFileTree(list) {
  let lis = '';
  list.forEach((el) => (lis += `<li id='j-${el.name}'>${el.name}</li>`));
  const oUl = document.getElementById('j-filelist')
  oUl.innerHTML = lis;
  oUl.addEventListener('click',async function(event){
    if( event.target.tagName === 'LI' ){
      let fileData = globelData.fileList.find(el=>el.name === event.target.innerText.trim())
      const fileContent = await fileData.getFile();
      readFileContent(fileContent)
    }
  })
}




/**
 * Get a server-side file list of the directory
 * @param {String} dir chosen directory
 * @returns {Array} JSON filename array
 */
function getFileList(dir) {
    let files;
    $.getJSON(dir, data => {
        console.log(`found ${data.length} element${(data.length > 1) ? 's' : ''} : `);
        console.log(data)
        files = data;
    });

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(files);
        }, 1000);
    });
}

/**
 * Create divs associated to each file in a directory (async call)
 * @param {String} dir chosen directory
 * @param {String} parentId parent div id
 */
async function CreateFileDivs(dir, parentId) {
    console.log('calling');
    let fileJSON
    fileJSON = await getFileList(dir);
    
    if (fileJSON == undefined) {
        console.log('failed to load file list');
        const header = document.getElementById(parentId + "-header");
        header.appendChild(document.createTextNode(`Failed to load files`));
        return;
    }
    console.log('got file list');

    const icons = {
        "png":"fas fa-image",
        "jpg":"fas fa-image",
        "jpeg":"fas fa-image",
        "gif":"fas fa-image",
        "zip":"far fa-file-archive",
        "rar":"far fa-file-archive",
        "gz":"far fa-file-archive",
        "tar":"far fa-file-archive",
        "mp4":"fas fa-film",
        "webm":"fas fa-film",
        "mkv":"fas fa-film",
        "wmv":"fas fa-film",
        "flv":"fas fa-film",
        "mp3":"fas fa-file-audio",
        "ogg":"fas fa-file-audio",
        "m4a":"fas fa-file-audio",
        "json":"fas fa-file-code",
        "c":"fas fa-file-code",
        "py":"fas fa-file-code",
        "java":"fas fa-file-code",
        "bat":"fas fa-file-code",
        "other":"far fa-file"
    }

    const header = document.getElementById(parentId + "-header");
    header.appendChild(document.createTextNode(`${fileJSON.length} files located :`))
    let filedivs = [];
    for (let i = 0; i < fileJSON.length; i++) {
        const File_element = document.createElement("div");
        File_element.className = "file";

        let ext = fileJSON[i].split(".").pop();
        const icon = document.createElement("em");
        icon.className = Object.keys(icons).includes(ext) ? icons[ext] : icons["other"];
        icon.style.fontSize = "30px";
        icon.style.marginRight = "20px";
        File_element.appendChild(icon);

        const textContent = document.createTextNode(fileJSON[i]);
        File_element.appendChild(textContent);

        const parentDiv = document.getElementById(parentId);

        parentDiv.appendChild(File_element);
        filedivs.push(File_element);
    }
}
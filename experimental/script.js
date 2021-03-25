
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
        }, 100);
    });
}

/**
 * Create divs associated to each file in a directory (async call)
 * @param {String} dir chosen directory
 * @param {String} parentId parent div id
 */
async function CreateFileDivs(dir, parentId) {
    console.log('calling');
    const fileJSON = await getFileList(dir);
    console.log('got file list');

    const header = document.getElementById(parentId + "-header");
    header.appendChild(document.createTextNode(`${fileJSON.length} files located :`))
    let filedivs = [];
    for (let i = 0; i < fileJSON.length; i++) {
        const File_element = document.createElement("div");
        File_element.className = "file";

        const textContent = document.createTextNode(`name : ${fileJSON[i]}`);
        File_element.appendChild(textContent);
        const parentDiv = document.getElementById(parentId);

        parentDiv.appendChild(File_element);
        filedivs.push(File_element);
    }
}
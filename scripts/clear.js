import fs from 'fs';
import readline from 'readline';

const responseStatus = {
    changelogReset: false,
    versionReset: false,
    reponameResetInChangeset: false,
    readmeReset: false,
    insertedMetadataInReadme: false
};

// Function to clear the contents of a file
function clearFileContent(filePath) {
    console.log("Resetting CHANGELOG.md...");
    fs.writeFileSync(filePath, '', 'utf8');
    responseStatus.changelogReset = true;
}

// Function to change the version in package.json
async function updatePackageVersion() {
    const packageFilePath = 'package.json';
    const newVersion = '0.0.0';
    console.log("Resetting package version...");
    fs.readFile(packageFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${packageFilePath}:`, err);
            return;
        }

        try {
            const packageData = JSON.parse(data);
            packageData.version = newVersion;
            fs.writeFileSync(packageFilePath, JSON.stringify(packageData, null, 2));
            responseStatus.versionReset = true;
        } catch (jsonParseError) {
            console.error(`Error parsing ${packageFilePath}:`, jsonParseError);
        }
    });
}

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

async function clearREADME() {
    const ifWantToClearREADME = await askQuestion("Do you want to clear the README as well? (y/n): ");

    if (ifWantToClearREADME.toLowerCase() === 'y') {
        console.log("Resetting README.md...");
        const READMEPath = "README.md";
        fs.writeFileSync(READMEPath, '', 'utf8');
        responseStatus.readmeReset = true;

        const ifWantToAddRepoTitleAndDesc = await askQuestion("Do you want to add repo name and description to the README? (y/n): ");
        if (ifWantToAddRepoTitleAndDesc.toLowerCase() === 'y') {
            const reponame = await askQuestion('Enter the new repository name: ');
            const repodesc = await askQuestion('Enter the new short repository description: ');
            console.log("Adding metadata to README.md...");
            fs.writeFileSync(READMEPath,
                `# ${reponame}
${repodesc}`)
            responseStatus.insertedMetadataInReadme = true;
        }
    }
}

async function askForRepoInfo() {
    const repoowner = await askQuestion('Enter the repo owner name: ');
    const reponame = await askQuestion('Enter the repo name: ');

    return [repoowner.trim(), reponame.trim()];
}

async function updateRepoInfo() {
    const changesetFilePath = '.changeset/config.json';

    console.log("Proceeding to change `repo` field in ./changeset/config.json...");

    const [repoowner, reponame] = await askForRepoInfo();

    fs.readFile(changesetFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${changesetFilePath}:`, err);
            return;
        }
        try {
            const changesetData = JSON.parse(data);
            changesetData.changelog[1].repo = `${repoowner}/${reponame}`;
            fs.writeFileSync(changesetFilePath, JSON.stringify(changesetData, null, 2));
            responseStatus.reponameResetInChangeset = true;
        } catch (jsonParseError) {
            console.error(`Error parsing ${changesetFilePath}:`, jsonParseError);
        }
    });
}

function presetResponse() {
    if (responseStatus.changelogReset) {
        console.log("Contents of the CHANGELOG.md has been cleared.");
    }
    if (responseStatus.readmeReset) {
        console.log("Contents of the README.md has been cleared");
    }
    if (responseStatus.reponameResetInChangeset) {
        console.log("The `repo` field has been reset to your repo name.")
    }
    if (responseStatus.versionReset) {
        console.log("Package version has been reset.");
    }
    if (responseStatus.insertedMetadataInReadme) {
        console.log("Basic repository metadata has been inserted in the README.md file.");
    }
}

async function main() {
    clearFileContent('CHANGELOG.md');
    await updatePackageVersion();
    await updateRepoInfo();
    await clearREADME();
    presetResponse();
}

main();

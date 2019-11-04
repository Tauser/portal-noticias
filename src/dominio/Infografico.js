module.exports = class Infografico {

    static regex() {
        return /(<div id="infografico-container-)(.*?)[^g]+(<\/div>)/g;
    }

    static regexUrl() {
        return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%\\/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!\\/\\w]*))?)/g;
    }
    
};
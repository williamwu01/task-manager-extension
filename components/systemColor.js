let manualTheme = null;

//set the popup background to match system light/dark mode 
export function setPopupBackground() {
    let isDark;
    if(manualTheme === 'light') {
        isDark = false;
    } else if ( manualTheme === 'dark') {
        isDark = true;
    } else {
        //follows system theme , checks by dark 
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    document.body.style.background = isDark ? '#232323' : '#fff';
    document.documentElement.style.setProperty('--color-title', isDark ? '#fff' : '#232323');
    console.log('Set --color-title to', isDark ? '#fff' : '#232323');

}
//listen for system color scheme change and update background
export function listenForSystemColorChange() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!manualTheme) setPopupBackground();
    });
}

export function setManualTheme(theme) {
    // theme: 'light', 'dark', or 'system'
    if ( theme === 'system') { 
        manualTheme = null;
    } else {
        manualTheme = theme;
    }
    setPopupBackground();
}

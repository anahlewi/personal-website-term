
var instagram = "https://www.instagram.com/anahlewi/";
var tiktok = "https://www.tiktok.com/@anahlewi?lang=en";
var linkedIn="https://www.linkedin.com/in/anahlewi/";
var youtube="https://www.youtube.com/@BecomingAnah";

var mosaicLink="https://editor.p5js.org/anahlewi/sketches/iODvPEM0j";
var colorGridLink="https://editor.p5js.org/anahlewi/sketches/aftCPJkJI";
var audioVisualizerLink="https://editor.p5js.org/anahlewi/sketches/NQjHJ4xQD";
var tenPrintLink="https://editor.p5js.org/anahlewi/sketches/-UWdZ-lIF";
var digitalMolasLink="https://anahlewi.github.io/digital-molas/";


const banner = "<pre class='banner'>" + 
"                           888            888                        d8b\n"+
"                           888            888                        Y8P\n"+
"                           888            888                           \n"+
 "  888b.  88888b.   8888b.  88888b.        888  .d88b.  888  888  888 888\n"+
   '    "88b 888 "88b     "88b 888 "88b       888 d8P  Y8b 888  888  888 888\n' +
".d888888 888  888 .d888888 888  888       888 88888888 888  888  888 888\n" +
'888  888 888  888 888  888 888  888       888 Y8b.     Y88b 888 d88P 888\n' +
'"Y888888 888  888 "Y888888 888  888       888  "Y8888   "Y8888888P"  888\n' +
 "</pre>";

const helpDescription  =
    '<p class="command">whoisanah      --about me<p>\n'+ 
    '<p class="command">socials    --displays social media<p>\n'+
    '<p class="command">projects       --view my recent coding projects<p>\n'+
    '<p class="command">help          --see list of commands<p>\n'+
    '<p class="command">email          --email address<p>\n'+
    '<p class="command">youtube          --view my latest youtube video<p>\n'+
    '<p class="command">banner          --see the logo for my website<p>\n'+
    '<p class="command">clear         --clear terminal<p>\n'+
    '<p class="command">history         --view command history<p>\n';
    
const aboutMeDescription  = `<p class='command' style="text-wrap: inherit"> Hiiiii ☺️ my name is Anah! 
 I am 26 years old, born and raised in Brooklyn, NY. I am currently a software engineer/creative coder, however 
 in my free time I like to keep busy with a slew of things. My friends and family often use the word
 restless to desribe me, but I like to think of myself as someone who is active. I am what you would call a generalist, my many interests 
 inspire me and have shaped me into the person I am today. If you are reading this thank you for being here, hope you enjoy my
 personal website.
</p>`;

const socialMediaDescription= `<p class="command"> Follow me on <a class="link" target="_blank" href=${instagram}>Instagram</a> </p>\n
                               <p class="command"> Follow me on <a class="link" target="_blank" href=${tiktok}>Tiktok</a> </p>\n
                               <p class="command"> Follow me on <a class="link" target="_blank" href=${linkedIn}>LinkedIn</a> </p>\n`;

const youtubeDescripton = `<p class="command"> Check me out my Youtube Channel <a class="link" target="_blank" href=${youtube}>Becoming Anah</a>.</p> <p class="command">I am a modern day
                            herstorian mostly passionate about documenting her life and outfits </p>`;

const projectsDescription = `
                <h4>p5 projects</h4>
                <p><a class="link" target="_blank" href=${mosaicLink}>mosaic potrait</></p>
                <p><a class="link" target="_blank" href=${colorGridLink}>color grid</></p>
                <p><a class="link" target="_blank" href=${audioVisualizerLink}>audio visualizer</></p>
                <p><a class="link" target="_blank" href=${tenPrintLink}>10 print</></p>
                <p><a class="link" target="_blank" href=${digitalMolasLink}>Digital Molass</></p>`;

const emailDescription = `<p class="command">email me at <a class="link" target="_blank" href="mailto:anahlewi@gmail.com">
                            anahlewi@gmail.com</a></p>`;

export const listOfCommands = {
    "help": helpDescription,
    "whoisanah": aboutMeDescription,
    "socials": socialMediaDescription,
    "youtube":youtubeDescripton,
    "projects": projectsDescription,
    "email":emailDescription,
    "banner": banner
}


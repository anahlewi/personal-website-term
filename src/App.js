import './App.css';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import parse from 'html-react-parser';
import { commandLogic } from './commandLogic';

function HowToUseModal({ onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>[ close ]</button>
        <h3 className="modal-title">// how to use this</h3>
        <div className="modal-body">
          <p> 
             Anahesty corner is a command line interface built into this website. Designed
            to give you the honest, occasionally unfiltered, advice based on your commands.<br />

            <span className="modal-key">What is a command line interface (CLI)? </span> 
             a text-based user interface (like Windows cmd.exe or macOS/Linux Terminal) 
             that allows you to directly control your computer's 
             operating system by typing sequential, 
             keyboard-driven text commands instead 
             of clicking icons with a mouse.<br />
                       </p>
          <br />
          <p><span className="modal-key">help</span> — see all available commands</p>
          <p><span className="modal-key">fortune</span> — get a fortune cookie message</p>
          <p><span className="modal-key">advice</span> — get a piece of good advice?</p>
          <p><span className="modal-key">howtouse</span> —  view this guide on how to use the site</p>
          <p><span className="modal-key">badadvice</span> — get a piece of bad advice</p>
          <p><span className="modal-key">banner</span> — display the site logo</p>
          <p><span className="modal-key">clear</span> — wipe the terminal screen</p>
          <p><span className="modal-key">history</span> — view your past commands</p>
          <br />
          <p>Use <span className="modal-key">↑</span> / <span className="modal-key">↓</span> arrow keys to cycle through previous commands.</p>
          <p>Press <span className="modal-key">Enter</span> to run it.</p>
          <p>Press <span className="modal-key">Esc</span> or click outside to close this window.</p>
        </div>
      </div>
    </div>
  );
}

function App (){
  const [commandHistory, setCommandHistory] = useState([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const guestLabel = "visitor@anah.site:~$";
  const historyIndex = useRef(-1);

  const blurb = `<p id="intro-blurb">Seeking advice? Welcome to anahesty corner🔮. I provide honest, occasionally unfiltered responses based on your commands.<br>For a list of available commands, type <span class="add-glow">'help'</span>.</p>`
  const [history, setHistory]= useState([parse(commandLogic('banner')), parse(blurb)]);

  const scrollToBottom = (smooth = true) => {
    inputRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "instant" })
  }

  const handleInputChange = (e) => {
    setValue(e.target.value);
    setCursorPosition(e.target.selectionStart);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useLayoutEffect(() => {
    const updateCaretPosition = () => {
      if (inputRef.current && caretRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        const style = window.getComputedStyle(inputRef.current);
        const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

        const pre = document.createElement('pre');
        pre.style.position = 'absolute';
        pre.style.left = '-9999px';
        pre.style.top = '0';
        pre.style.font = font;
        pre.textContent = value.slice(0, cursorPosition);
        document.body.appendChild(pre);

        const preRect = pre.getBoundingClientRect();
        const leftPos = rect.left + preRect.width + parseInt(style.paddingLeft, 10);
        const topPos = rect.top + parseInt(style.paddingTop, 10);

        caretRef.current.style.left = `${leftPos}px`;
        caretRef.current.style.top = `${topPos}px`;
        caretRef.current.style.height = `${parseInt(style.fontSize, 10)}px`;

        document.body.removeChild(pre);
      }
    };

    updateCaretPosition();
    scrollToBottom(false);

    const handleResize = () => {
      updateCaretPosition();
      scrollToBottom(true);
    };

    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
    };
  }, [value, cursorPosition, history]); // eslint-disable-line react-hooks/exhaustive-deps

  const inputComponent = () => {
    return(
      <>
          <label class="label">{guestLabel}</label>
          <input         
            type="text"
            value={value}
            onKeyDown={handleKeyPress} 
            onSelect={handleInputChange}
            onChange={handleInputChange}
            class="no-border-input" 
            ref={inputRef}
            autoFocus
          />
          <span ref={caretRef} className="blinking-cursor">█</span>
      </>
    );
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setCommandHistory(commandHistory => [...commandHistory, value])

      if(value === "clear"){
        setHistory([])
        setValue('');
      } else if (value === "history") {
        commandHistory.forEach((command)=>{
         const printCommand = `<p class="command">${command}</p><br>`;
         setHistory(commandHistory => [...commandHistory, parse(printCommand)]);
        })
        setValue('');
      } else if (value === "advice") {
        const currCommand = <p>{`${guestLabel}${value}`}</p>;
        addNewLine(currCommand);
        setValue('');
        fetch('https://api.api-ninjas.com/v1/advice', {
          headers: { 'X-Api-Key': 'SheVxmzddXAEAz78L2IdmMesHSK1nJbriHH1G8iv' }
        })
          .then(res => res.json())
          .then(data => {
            addNewLine(parse(`<p class="command">${data.advice}</p>`));
          })
          .catch(() => {
            addNewLine(parse(`<p class="command-not-found">Failed to fetch advice.</p>`));
          });
      } else if (value === "badadvice") {
        const currCommand = <p>{`${guestLabel}${value}`}</p>;
        addNewLine(currCommand);
        setValue('');
        fetch('https://api.adviceslip.com/advice')
          .then(res => res.json())
          .then(data => {
            const advice = data.slip?.advice || "No advice found.";
            addNewLine(parse(`<p class="command">${advice}</p>`));
          })
          .catch(() => {
            addNewLine(parse(`<p class="command-not-found">Failed to fetch bad advice.</p>`));
          });
      } else if (value === "fortune") {
        const currCommand = <p>{`${guestLabel}${value}`}</p>;
        addNewLine(currCommand);
        setValue('');
        fetch('https://aphorismcookie.herokuapp.com/')
          .then(res => res.json())
          .then(data => {
            const msg = data.data?.message || data.message || data.fortune || JSON.stringify(data);
            addNewLine(parse(`<p class="command">${msg}</p>`));
          })
          .catch(() => {
            addNewLine(parse(`<p class="command-not-found">Failed to fetch fortune.</p>`));
          });
      } else if (value === "howtouse") {
        const currCommand = <p>{`${guestLabel}${value}`}</p>;
        addNewLine(currCommand);
        setValue('');
        setShowModal(true);
      } else {
        const currCommand = <p>{`${guestLabel}${value}`}</p>;
        var displayCommand = commandLogic(value)
        addNewLine(currCommand);
        addNewLine(parse(displayCommand));
        setValue('');
      }
    } else if (event.keyCode === 38) { // Up arrow key
      if (historyIndex.current > 0) {
        historyIndex.current = historyIndex.current -1;
        setValue(commandHistory[historyIndex.current]);
      } else if (historyIndex.current === -1 && commandHistory.length > 0) {
        historyIndex.current = commandHistory.length -1;
        setValue(commandHistory[historyIndex.current]);
      }
    } else if (event.keyCode === 40) { // Down arrow key
      if (historyIndex.current < commandHistory.length - 1 && historyIndex.current!==-1) {
        historyIndex.current = historyIndex.current +1;
        setValue(commandHistory[historyIndex.current]);
      } else if (historyIndex.current >= 0) {
        historyIndex.current = -1;
        setValue('')
      }
    } 
  };

  const addNewLine = (newLine) =>{
    setHistory(history=>[...history, newLine]);
  }

  return (
    <>
    {showModal && <HowToUseModal onClose={() => setShowModal(false)} />}
    {history.map(item => item)}
    <div class="display-flex">
      {inputComponent()}
    </div>
    </>
  );
}

export default App;

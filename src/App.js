import './App.css';
import { useState, useRef, useEffect } from 'react';
import parse from 'html-react-parser';
import { commandLogic } from './commandLogic';

function App (){
  const [commandHistory, setCommandHistory] = useState([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const [value, setValue] = useState('');
  const guestLabel = "visitor@anah.site:~$";
  const historyIndex = useRef(-1);

  const blurb = `<p id="intro-blurb">Welcome to my interactive web terminal.<br>For a list of available commands, type <span class="add-glow">'help'</span>.</p>`
  const [history, setHistory]= useState([parse(commandLogic('banner')), parse(blurb)]);

  const scrollToBottom = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleInputChange = (e) => {
    setValue(e.target.value);
    setCursorPosition(e.target.selectionStart);
  };

  useEffect(() => {
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
    scrollToBottom();

    const handleResize = () => {
      updateCaretPosition();
      scrollToBottom();
    };

    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
    };
  }, [value, cursorPosition]);

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
    {history.map(item => item)}
    <div class="display-flex">
      {inputComponent()}
    </div>
    </>
  );
}

export default App;

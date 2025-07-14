import { createContext, useState } from "react";
import runChat from "../config/gemini";
import { responsesAPI } from "../services/api";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")


    function delayPara(index, nextWord) {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }

    const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    let currentPrompt;
    
    if (prompt !== undefined) {
        currentPrompt = prompt;
        response = await runChat(prompt);
        setRecentPrompt(prompt);
    } else {
        currentPrompt = input;
        setPrevPrompts(prev => [...prev, input]);
        setRecentPrompt(input);
        response = await runChat(input);
    }

    let responseArray = response.split('**');
    let newArray = "";
    for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
            newArray += responseArray[i];
        } else {
            newArray += "<b>" + responseArray[i] + "</b>";
        }
    }

    console.log("Final response:", newArray);

    // Save response to backend
    try {
        await responsesAPI.submitResponse({
            prompt: currentPrompt,
            response: response
        });
        console.log("Response saved to backend");
    } catch (error) {
        console.error("Failed to save response:", error);
    }

    const words = newArray.split('*').join("</br>").split(" ");
    words.forEach((word, i) => {
        delayPara(i, word + " ");
    });

    setLoading(false);
    setInput("");

    return newArray; // ✅ return the full processed response
};

    const newChat = async () => {
        setLoading(false);
        setShowResult(false);
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
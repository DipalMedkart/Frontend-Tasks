// 'use client';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import styles from '@/styles/index.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';



const Json_Parser = () => {

    const dispatch = useDispatch()
    const jsonInput = useSelector((state) => state.json)
    const parsedJson = useSelector((state) => state.parsedJson)
    const error = useSelector((state) => state.error)

    const [toggle, setToggle] = useState({});

    const handleToggle = (key) => {
        setToggle((prev) => ({ ...prev, [key]: !prev[key] }));
        console.log(toggle);
    }

    const handleInputChange = (e) => {
        // dispatch({ type: 'ERROR', payload: null });
        dispatch({ type: 'JSON', payload: e.target.value })
    }

    const multipleValue = (value) => {
        const isArray = Array.isArray(value);
        const isObject = typeof value === 'object' && value !== null;
        return (isArray) || (isObject);
    }

    const handleClear = () => {
        dispatch({ type: "CLEAR_INPUT" });

    }



    const validate = (input) => {
        if (!input) {
            return "Input can't be empty!";
        }


        if (typeof input === 'string' && input.startsWith("'") && input.endsWith("'")) {
            input = input.slice(1, -1);
        }

        try {


            const parsed = JSON.parse(input);

            if (typeof parsed !== 'object' || Array.isArray(parsed)) {
                return "Input must be a JSON object."
            }
            return null;
        } catch (err) {
            return `Invalid JSON : ${err.message}`
        }
    }


    const handleParseJson = () => {

        dispatch({ type: 'ERROR', payload: null });
        let inputToParse;

        const isError = validate(jsonInput);

        if (isError) {
            dispatch({ type: 'ERROR', payload: isError });
            return;
        }

        try {


            inputToParse = jsonInput;

            if (typeof jsonInput === 'string' && jsonInput.startsWith("'") && jsonInput.endsWith("'")) {
                inputToParse = jsonInput.slice(1, -1);
            }

            console.log("input to parse " + inputToParse);
            const parsed = JSON.parse(inputToParse);
            console.log("parsed" + parsed);
            dispatch({ type: 'PARSE_JSON', payload: parsed })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message })
        }
    }




    const renderParsedJson3 = (data, parentKey = '') => {

        if (typeof data === "object" && data !== null) {
            return (
                <div className={styles.jsonOutput}>
                    <span className={styles.span}>{"{"}</span>
                    {Object.entries(data).map(([key, value], index) => {
                        const fullKey = parentKey ? `${parentKey}.${key}` : key;
                        console.log(fullKey);
                        return (
                            (
                                <div key={fullKey} className={styles.innerDiv}>
                                    {multipleValue(value) && (
                                        <button
                                            className={styles.toggleButton}
                                            onClick={() => handleToggle(fullKey)}
                                        >
                                            {toggle[fullKey] ? "v" : ">"}
                                        </button>
                                    )}
                                    <strong>{key}</strong>:{" "}
                                    {!multipleValue(value) && (
                                        <span>{value}</span>
                                    )}
                                    {toggle[fullKey] && renderParsedJson3(value, `${fullKey}.${index}`)}
                                </div>)
                        )
                    })}
                    <span className={styles.span}>{"}"}</span>
                </div>
            );
        }
        return <span className={styles.value}>{data}</span>;
    };


    /*
    const renderParsedJson = (data) => {
        if (typeof data === 'object' && data !== null) {
            return (
                <div className={styles.jsonOutput}>
                    <span className={styles.span}>{'{'}</span>
                    {Object.entries(data).map(([key, value], index) => (
                        <div key={index} className={styles.innerDiv}>
                            <strong>{key}</strong>: {Array.isArray(value) ? (
                                <>
                                    <span>[{value.length}] {""}</span>
                                    <div className={styles.innerDiv}>
                                        <span className={styles.span}>{'['}</span>
                                        {value.map((item, idx) => (
                                            <div key={idx} className={styles.innerDiv}>
                                                {typeof item === 'object' ? (
                                                    renderParsedJson(item)
                                                ) : (
                                                    <span>{item}</span>
                                                )}
                                            </div>
                                        ))}
                                        <span className={styles.span}>{']'}</span>
                                    </div>
                                </>
                            ) : typeof value === 'object' ? (
                                <>
                                    {renderParsedJson(value)}
                                </>
                            ) : (
                                <span>{value}</span>
                            )}
                        </div>
                    ))}
                    <span className={styles.span}>{'}'}</span>
                </div>
            );
        }
        return <span className={styles.value}>{data}</span>;
    };
    */


    useEffect(() => {
        if (error) {
            toast.error(error);
            // dispatch({ type: 'ERROR', payload: null });
        }
    }, [error]);

    return (

        <div className={styles.container}>
            <ToastContainer />
            <h1 className={styles.header}>JSON Parser</h1>
            <label htmlFor="" className={styles.label}>Input JSON</label>
            <textarea
                id='input'
                className={styles.input}
                value={jsonInput}
                onChange={handleInputChange}
                placeholder='Enter JSON here...'
            />
            {error && <div className={styles.errorDiv}>
                <h3 className={styles.errorH3}>{error}</h3>
            </div>}
            <div className={styles.buttons}>
                <button onClick={handleParseJson} className={styles.parseButton}>Parse JSON</button>
                <button onClick={handleClear} className={styles.parseButton}>Clear</button>
            </div>

            {parsedJson && (
                <>
                    <h3 className={styles.resultHeader}>Parsed JSON</h3>

                    <div className={styles.resultContainer}>

                        {!error && parsedJson && renderParsedJson3(parsedJson)}

                    </div>
                </>
            )}
        </div>

    )


}

export default Json_Parser;  
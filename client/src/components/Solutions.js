import React, {useEffect, useState} from 'react';
import Solution from './Solution';

const Solutions = (props) => {
    const [solution1, setSolution1] = useState("");
    const [solution2, setSolution2] = useState("");
    const [solution3, setSolution3] = useState("");
    const [solution1ForUpdate, setSolution1ForUpdate] = useState("");
    const [solution2ForUpdate, setSolution2ForUpdate] = useState("");
    const [solution3ForUpdate, setSolution3ForUpdate] = useState("");

    useEffect(() => {
        if (props.isUpdating === true) {
            let str = [solution1ForUpdate, solution2ForUpdate, solution3ForUpdate]
            props.solutionsUpdate(str.join(" "));
        } else {
            let strings = [solution1, solution2, solution3]
            props.solutionsCreate(strings.join(" "));
        }
    }, [solution1, solution2, solution3]);

    function getSolution1(data) {
        setSolution1(data);
    }

    function getSolution2(data) {
        setSolution2(data);
    }

    function getSolution3(data) {
        setSolution3(data);
    }

    function getSolution1ToUpdate(data) {
        setSolution1ForUpdate(data);
    }

    function getSolution2ToUpdate(data) {
        setSolution2ForUpdate(data);
    }

    function getSolution3ToUpdate(data) {
        setSolution3ForUpdate(data);
    }

    return (
        <div>
            <Solution number={1} index={0} solutionForUpdate={props.solutionForUpdate}
                      solution={(data) => getSolution1(data)} isUpdating={props.isUpdating}
                      solutionToUpdate={(data) => getSolution1ToUpdate(data)}/>
            <Solution number={2} index={1} solutionForUpdate={props.solutionForUpdate}
                      solution={(data) => getSolution2(data)} isUpdating={props.isUpdating}
                      solutionToUpdate={(data) => getSolution2ToUpdate(data)}/>
            <Solution number={3} index={2} solutionForUpdate={props.solutionForUpdate}
                      solution={(data) => getSolution3(data)} isUpdating={props.isUpdating}
                      solutionToUpdate={(data) => getSolution3ToUpdate(data)}/>
        </div>
    );
};

export default Solutions;
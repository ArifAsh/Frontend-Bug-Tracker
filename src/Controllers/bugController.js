import bugModel from '../Models/bugModel'

export function retrieveBugs(){
    let data = [];


    data.push(new bugModel({
        _id:0,
        name:"Bug Tracker",
        details:"Crashes after 3 seconds",
        steps: "Open app and it crashes",
        version:"V2.0",
        type: 1,
        assigned: "Client 1",
        creator: "Arif Ash",
        priority: 1,
        time:"23:38"
    }))
    data.push(new bugModel({
        _id:1,
        name:" Personal Website",
        details:"Crashes after 5 seconds",
        steps: "Open app and it crashes",
        version:"V2.0",
        type: 4,
        assigned: "Client 1",
        creator: "Arif Ash",
        priority: 3,
        time:"23:38"
    }))
    data.push(new bugModel({
        _id:2,
        name:" Project 5",
        details:" App malfunctions",
        steps: "Open app and it crashes",
        version:"V2.0",
        type: 3,
        assigned: "Client 1",
        creator: "Arif Ash",
        priority: 2,
        time:"22:00"
    }))
    data.push(new bugModel({
        _id:3,
        name:"Sudoku App",
        details:" Not tracking tiles",
        steps: "Onclick doesn't work",
        version:"V2.0",
        type: 2,
        assigned: "Client 1",
        creator: "Arif Ash",
        priority: 2,
        time:"22:00"
    }))
    data.push(new bugModel({
        _id:4,
        name:" Sorting visualizer",
        details:" Can not see merge sort",
        steps: "merge sort not dispalyed on screen",
        version:"V2.0",
        type: 1,
        assigned: "Client 1",
        creator: "Arif Ash",
        priority: 2,
        time:"22:00"
    }))
    data.push(new bugModel({
        _id:5,
        name:" Pathfinder Visualizer",
        details:"Can not add nodes to grid",
        steps: "Click on empty grid but nothing happens",
        version:"V2.0",
        type: 1,
        assigned: "Client 1",
        creator: "Arif Ash",
        priority: 3,
        time:"22:00"
    }))
    data.push(new bugModel({
        _id:6,
        name:" Sudoku Game and Solver",
        details:"Can not add nodes to grid",
        steps: "Click on empty grid but nothing happens",
        version:"V2.0",
        type: 3,
        assigned: "Client 1",
        creator: "Arif Ash",
        priority: 4,
        time:"22:00"
    }))
    
    return data;
}
// Decision Tree Configuration
const decisionTree = {
    startQuestion: 1,
    questions: {
        1: {
            id: 1,
            text: "Is your rental property properly registered with the city?",
            yes: 2,
            no: 2
        },
        2: {
            id: 2,
            text: "Do you provide heating that maintains at least 68°F during the day?",
            yes: 3,
            no: 3
        },
        3: {
            id: 3,
            text: "Are all electrical outlets and switches in working condition?",
            yes: 4,
            no: 5
        },
        4: {
            id: 4,
            text: "Is the property free from water leaks and moisture problems?",
            yes: 6,
            no: 6
        },
        5: {
            id: 5,
            text: "Have you addressed all electrical issues within 24 hours of being notified?",
            yes: 6,
            no: 6
        },
        6: {
            id: 6,
            text: "Are all windows intact and properly sealed?",
            yes: 7,
            no: 8
        },
        7: {
            id: 7,
            text: "Do you provide functioning smoke and carbon monoxide detectors?",
            yes: 9,
            no: 9
        },
        8: {
            id: 8,
            text: "Have window repairs been completed within 14 days of notification?",
            yes: 9,
            no: 9
        },
        9: {
            id: 9,
            text: "Is the property free from pest infestations?",
            yes: 10,
            no: 10
        },
        10: {
            id: 10,
            text: "Do you respond to maintenance requests within 48 hours?",
            yes: "end",
            no: "end"
        }
    }
};

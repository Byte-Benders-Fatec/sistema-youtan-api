const FormCategories = [
    "Avaliação de Liderado",
    "Avaliação de Liderança",
    "Autoavaliação"
];

const FormRoles = {
    "Avaliação de Liderado": {
        "Evaluator": [
            "Líder e Liderado",
            "Líder"
        ],
        "EvaluatedUser": ["Liderado", "Líder e Liderado"]
    },
    "Avaliação de Liderança": {
        "Evaluator": [
            "Líder e Liderado",
            "Liderado"
        ],
        "EvaluatedUser": ["Líder", "Líder e Liderado"]
    },
    "Autoavaliação": {
        "Evaluator": [
            "Líder",
            "Líder e Liderado",
            "Liderado"
        ],
        "EvaluatedUser": null
    }
};

export {FormCategories, FormRoles};
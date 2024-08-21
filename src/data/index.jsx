import { CheckmarkOutline, CloseOutline } from "react-ionicons";

export const data = {
    Name: {
        values: [
            "John Doe", "Jane Smith", "Sam Johnson", "Alice Brown", "Bob White", "Jack Nilson",
            "Emily Davis", "Michael Green", "Sophia Turner", "David Lee", "Olivia Harris",
            "Matthew Clark", "Emma Martinez", "William Taylor", "Isabella Garcia",
            "James Wilson", "Oliver Anderson", "Sophie Martinez", "Benjamin Thompson",
            "Charlotte Moore",
        ],
        classNames: (value) => 
            value === "Jane Smith" || value === "Emma Martinez"
            ? "text-green-400 font-semibold"
            : "text-black font-semibold",
    },

    // Age: {
    //     values: ["28", "34", "45", "29", "40", "40", "32", "26", "38", "31", "30", "27", "33", "44", "28", "39", "39", "25", "36", "37"],
    // },
    
    Email: {
        values: [
            "john.doe@example.com", "jane.smith@example.com", "sam.johnson@example.com", "alice.brown@example.com",
            "bob.white@example.com", "jack.nilson@example.com", "emily.davis@example.com", "michael.green@example.com",
            "sophia.turner@example.com", "david.lee@example.com", "olivia.harris@example.com", "matthew.clark@example.com",
            "emma.martinez@example.com", "william.taylor@example.com", "isabella.garcia@example.com",
            "james.wilson@example.com", "oliver.anderson@example.com", "sophie.martinez@example.com",
            "benjamin.thompson@example.com", "charlotte.moore@example.com",
        ],
        classNames: (value) => 
            typeof value === "string" && value.includes("john")
            ? "text-green-400 font-semibold"
            : "text-black font-semibold",
    },

    Data: {
        values: [
            "12/07/2020", "25/09/2021", "03/11/2022", "17/03/2024", "08/06/2023", "21/10/2020", "02/02/2021",
            "14/12/2023", "29/05/2022", "07/08/2020", "30/01/2023", "19/04/2021", "11/11/2022", "04/09/2024",
            "26/02/2020", "18/12/2021", "06/07/2022", "15/05/2024", "28/03/2020", "10/10/2023"
        ],
        classNames: (value) => 
            typeof value === "string" && value.includes("2024")
            ? "text-green-400 font-semibold"
            : "text-black font-semibold"
    },
}

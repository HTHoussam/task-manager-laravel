export const getStatusColor = (status: number): string => {
    switch (status) {
        case 0:
            return "#FFD70026";
        case 1:
            return "#FF634726";
        case 2:
            return "#32CD3226";
        case 3:
            return "#1E90FF26";
        default:
            return "#FFFFFF";
    }
};

import { fetchAllMembers } from "./AxiosAllMembers";

export const ProductService = {

    async getProductsData() {
        const members = await fetchAllMembers();
        return members;
    },

    async getProductsMini() {
        const data = await this.getProductsData();
        return data.slice(0, 5);
    },

    async getProductsSmall() {
        const data = await this.getProductsData();
        return data.slice(0, 10);
    },

    async getProducts() {
        return await this.getProductsData();
    }
};

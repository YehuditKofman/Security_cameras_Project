// ProductService.jsx
import { fetchAllMembers } from "./AxiosAllMembers";

export const ProductService = {
    async getProductsData(administratorId) {
        const members = await fetchAllMembers(administratorId);
        return members;
    },

    async getProducts(administratorId) {
        return await this.getProductsData(administratorId);
    },

    async getProductsMini(administratorId) {
        const data = await this.getProductsData(administratorId);
        return data.slice(0, 5);
    },

    async getProductsSmall(administratorId) {
        const data = await this.getProductsData(administratorId);
        return data.slice(0, 10);
    },
};

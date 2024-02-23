import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quantity: 0,
    currbook: [],
    purchase: [],
    currpur: 0,
    totalSum: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.quantity++;
            const bookId = action.payload.book?._id;

            const existingItemIndex = state.currbook.findIndex(item => item.book?._id === bookId);

            if (existingItemIndex !== -1) {
                state.currbook[existingItemIndex].quantity++;
            } else {
                state.currbook.push({ book: action.payload.book, quantity: 1 });
            }

            // Update the quant field in the book object
            const bookToUpdate = state.currbook.find(item => item.book?._id === bookId);
            if (bookToUpdate) {
                bookToUpdate.book.quant++;
            }

        },
        removeOne: (state, action) => {
            const indexToRemove = action.payload;
            if (state.currbook.length > 0 && indexToRemove >= 0 && indexToRemove < state.currbook.length) {
                const bookToRemove = state.currbook[indexToRemove];

                if (bookToRemove && typeof bookToRemove.book?.quant === 'number') {
                    state.quantity -= bookToRemove.book.quant;
                }

                state.currbook.splice(indexToRemove, 1);
            }
        },

        clearCart: (state) => {
            state.quantity = 0;
            state.currbook = [];
            state.currpur = 0;
            state.purchase = [];
            state.totalSum = 0;
        },
        addInPurchase: (state, action) => {
            const item = action.payload.book;
            const quant = parseInt(item?.quant);
            const price = parseFloat(item?.price);

            const existingItemIndex = state.purchase.findIndex(purchasedItem => purchasedItem.book?._id === item?._id);

            if (existingItemIndex !== -1) {
                const prevQuant = state.purchase[existingItemIndex].book.quant;
                state.purchase[existingItemIndex].book.quant += quant;
                const newQuant = state.purchase[existingItemIndex].book.quant;
                state.currpur += (newQuant - prevQuant);
            } else {
                state.purchase.push(action.payload);
                state.currpur += quant || 0;
            }

            if (!isNaN(quant) && !isNaN(price)) {
                const { totalSum } = state;
                state.totalSum = totalSum + (quant * price);
            }
        },
        removefromModal: (state, action) => {
            const item = action.payload.book;
            const quant = parseInt(item?.quant);
            const price = parseFloat(item?.price);

            const itemIndex = state.purchase.findIndex(purchasedItem => purchasedItem.book?._id === item?._id);

            if (itemIndex !== -1) {
                const removedItemQuant = state.purchase[itemIndex].book.quant;
                state.currpur -= removedItemQuant;
                state.purchase.splice(itemIndex, 1);
            }

            if (!isNaN(quant) && !isNaN(price)) {
                const { totalSum } = state;
                state.totalSum = totalSum - (quant * price);
            }
        }
        ,
        purchaseDone: (state) => {
            state.currpur = 0;
            state.purchase = [];
            state.totalSum = 0;
        },
        addSingle: (state, action) => {
            const { book } = action.payload;
            console.log(book.quant);
            const updatedCurrbook = state.currbook.map(item => {
                if (item.book._id === book._id) {
                    return {
                        ...item,
                        book: {
                            ...item.book,
                            quant: item.book.quant + 1
                        }
                    };
                }
                return item;
            });
            return {
                ...state,
                currbook: updatedCurrbook,
                quantity: state.quantity + 1
            };
        },
        removeSingle: (state, action) => {
            const { book } = action.payload;

            const updatedCurrbook = state.currbook.map(item => {
                if (item.book._id === book._id && item.book.quant > 0) {
                    return {
                        ...item,
                        book: {
                            ...item.book,
                            quant: item.book.quant - 1
                        }
                    };
                }
                return item;
            });

            // Filter out items with quant equal to 0
            const filteredCurrbook = updatedCurrbook.filter(item => item.book.quant > 0);

            return {
                ...state,
                currbook: filteredCurrbook,
                quantity: state.quantity > 0 ? state.quantity - 1 : 0
            };
        }



    },
});

export const { addToCart, removeOne, clearCart, addInPurchase, purchaseDone, removeSingle, addSingle, removefromModal } = cartSlice.actions;
export default cartSlice.reducer;

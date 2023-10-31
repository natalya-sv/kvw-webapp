import { createSlice } from "@reduxjs/toolkit";

const sponsorsSlice = createSlice({
  name: "sponsors",
  initialState: {
    sponsors: [],
    isLoading: false,
  },
  reducers: {
    setSponsors(state, action) {
      const sponsors = action.payload.sponsors.map((sponsor) => {
        return {
          id: sponsor.id,
          sponsorName: sponsor.sponsor_name,
          websiteUrl: sponsor.website_url,
          imageUrl: sponsor.image_url,
          sponsorType: sponsor.sponsor_type,
          active: sponsor.active,
        };
      });
      state.sponsors = sponsors;
    },
    updateSponsor(state, action) {
      const { id, sponsor_name, website_url, image_url, sponsor_type, active } =
        action.payload.sponsor;
      const index = state.sponsors.findIndex((sp) => sp.id === id);

      if (index !== -1) {
        const newSponsor = {
          id: id,
          sponsorName: sponsor_name,
          websiteUrl: website_url,
          imageUrl: image_url,
          sponsorType: sponsor_type,
          active: active,
        };
        state.sponsors[index] = newSponsor;
      }
    },
    addNewSponsor(state, action) {
      const { id, sponsor_name, website_url, image_url, sponsor_type, active } =
        action.payload.sponsor;
      const newSponsor = {
        id: id,
        sponsorName: sponsor_name,
        websiteUrl: website_url,
        imageUrl: image_url,
        sponsorType: sponsor_type,
        active: active,
      };
      state.sponsors.push(newSponsor);
    },
    removeSponsor(state, action) {
      state.sponsors = state.sponsors.filter(
        (item) => item.id !== action.payload.id
      );
    },

    removeSponsors(state, action) {
      const { deleteAll, ids } = action.payload;
      if (deleteAll) {
        state.sponsors = [];
      } else {
        state.sponsors = state.sponsors.filter((s) => !ids.includes(s.id));
      }
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
});
export const sponsorsActions = sponsorsSlice.actions;

export default sponsorsSlice;

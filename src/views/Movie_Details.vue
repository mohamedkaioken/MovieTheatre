<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-img
          :src="src + results.backdrop_path"
          height="300px"
          class="mr-9"
        ></v-img>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <v-row>
          <v-col cols="3">
            <v-img
              :src="src + results.poster_path"
              height="900px"
              class="mr-9"
            ></v-img>
          </v-col>
          <v-col cols="9">
            <v-card height="900" class="black">
              <v-card-title class="display-2">
                <v-col cols="8"> {{ results.title }}</v-col>
                <v-col cols="4">
                  <v-row>
                    <div class="">{{ 4.5 }}</div>
                    <v-rating
                      :value="4.5"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="25"
                      class=" ml-4"
                    ></v-rating>
                  </v-row>
                </v-col>
              </v-card-title>
              <v-card-subtitle class="ml-3">
                {{ new Date(results.release_date).getFullYear() }} |
                {{ new Date(results.runtime).getHours() }} Hours
              </v-card-subtitle>
              <v-chip
                class="ma-2 ml-5"
                v-for="gene in results.genres"
                :key="gene.id"
              >
                {{ gene.name }}
              </v-chip>
              <h2 class="ml-5 mt-6">Over View</h2>
              <v-divider></v-divider>
              <v-card-text>  
                  {{ results.overview }} 
              </v-card-text>
              <v-card-actions class="pa-4">
                <v-btn>
                  <v-icon left>mdi-login-variant</v-icon>
                  Add to WatchList
                </v-btn>
                <v-btn>
                  <v-icon color="yellow" left>mdi-star</v-icon>
                  Rate this Movie
                </v-btn>
                <v-spacer></v-spacer>
                <span class="grey--text text--lighten-2 caption mr-2">
                  ({{ rating }})
                </span>
                <v-rating
                  v-model="rating"
                  background-color="white"
                  color="yellow accent-4"
                  dense
                  half-increments
                  hover
                  size="23"
                  class="mr-10"
                ></v-rating>
              </v-card-actions>
              <v-row>
                   <v-col cols="8">
                    <v-textarea class="ml-5"
                      label="Your Review"
                    ></v-textarea>
                   </v-col>
                   <v-col cols="4" class="mt-16">
                       <v-btn>
                           Add Review
                       </v-btn>
                   </v-col>
              </v-row>
              <v-row class="ml-5">
                <h3>Reviews</h3>
              </v-row>
                <v-row class="ml-2">
                  <v-col cols="6">
                    <p>Nice Movie Great Tom Hanks</p>
                  </v-col>
                  <v-col>
                    <v-rating
                      :value="4.5"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="25"
                      class=" ml-4"
                    ></v-rating>
                  </v-col>
                </v-row >
                <v-row class="ml-2">
                  <v-col cols="6">I loved it So much</v-col>
                  <v-col>
                    <v-rating
                      :value="5"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="25"
                      class=" ml-4"
                    ></v-rating>
                  </v-col>
                </v-row>
                <v-row class="ml-2">
                  <v-col cols="6">
                    I was nice Movie but still there is more from tom hanks
                  </v-col>
                  <v-col>
                    <v-rating
                      :value="3.5"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="25"
                      class=" ml-4"
                    ></v-rating>
                  </v-col>
                </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiService from "../services/api.service";

export default {
  mounted() {
    this.movieId = this.$route.params.movieId;
    ApiService.get(
      `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=18ba471261d253fb5c574c6f1de06e76`
    ).then((r) => {
      if (r.status == 200) {
        this.movies = r.data;
        this.results = this.movies;
        this.ShowTime = false;
      } else {
        console.log(r);
      }
      console.log(this.results);
    });
  },
  data: () => ({
    show: false,
    // route:$route.params.movieId,
    movies: [],
    results: [],
    descriptions: [],
    movie: "",
    ShowForm: false,
    snackbar1: false,
    snackbar2: false,
    snackbar3: false,
    src: "https://image.tmdb.org/t/p/original",
    rating: 0.0,
    genres: [
      {
        id: 28,
        name: "Action",
      },
      {
        id: 12,
        name: "Adventure",
      },
      {
        id: 16,
        name: "Animation",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 80,
        name: "Crime",
      },
      {
        id: 99,
        name: "Documentary",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Family",
      },
      {
        id: 14,
        name: "Fantasy",
      },
      {
        id: 36,
        name: "History",
      },
      {
        id: 27,
        name: "Horror",
      },
      {
        id: 10402,
        name: "Music",
      },
      {
        id: 9648,
        name: "Mystery",
      },
      {
        id: 10749,
        name: "Romance",
      },
      {
        id: 878,
        name: "Science Fiction",
      },
      {
        id: 10770,
        name: "TV Movie",
      },
      {
        id: 53,
        name: "Thriller",
      },
      {
        id: 10752,
        name: "War",
      },
      {
        id: 37,
        name: "Western",
      },
    ],
  }),
  methods: {
    GetMovies() {
      if (this.movie) {
        ApiService.get(
          `https://api.themoviedb.org/3/movie/${this.id}?api_key=18ba471261d253fb5c574c6f1de06e76`
        ).then((r) => {
          if (r.status == 200) {
            this.movies = r.data;
            this.results = this.movies.results;
            this.descriptions = this.results.map((s) => ({
              description: s.overview,
            }));
            this.ShowForm = true;
          } else {
            console.log(r);
          }
        });
      }
    },
  },
};
</script>

<style scoped></style>

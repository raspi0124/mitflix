<!--ログイン時にヘッダーナビゲーションに出現するプロジェクトなどの作成ボタン-->
<template>
  <v-container>
    <v-menu bottom rounded offset-y>
      <template v-slot:activator="{ on }">
        <v-btn depressed large color="primary" v-on="on">
          Create
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content>
          <div>
            <v-btn
              depressed
              text
              to="/dashboard/new/project"
              min-width="100px"
              width="100%"
            >
              New Project
            </v-btn>
            <v-divider class="my-1"></v-divider>
            <v-btn
              depressed
              text
              to="/dashboard/new/event"
              min-width="100px"
              width="100%"
            >
              New Event
            </v-btn>
            <v-divider class="my-1"></v-divider>
            <v-btn
              depressed
              text
              to="/dashboard/new/article"
              min-width="100px"
              width="100%"
            >
              New Article
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </v-container>
</template>

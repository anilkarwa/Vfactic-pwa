<template>
    <div>
        <v-icon v-if="getCurrentUserRoles('editRight') == '1'" small class="mr-2" @click="onEdit()">edit</v-icon>
        <v-icon v-if="getCurrentUserRoles('deleteRight') == '1'" small @click="onDelete()">delete</v-icon>
    </div>
</template>

<script>
export default {
    name: "EditDeleteIconRender",
    methods: {
        onEdit() {
            console.log("edit clicked!!!");
            this.params.onEditClicked(this.params.data);
        },
        onDelete() {
            console.log("delete clicked!!!",);
            this.params.onDeleteClicked(this.params.data);
        },
        getCurrentUserRoles(type) {
            return localStorage.getItem(type) || 0;
        }
    },
};
</script>

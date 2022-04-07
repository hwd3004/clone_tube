<template>
  <div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

export default {
  components: {
    EditorContent,
  },

  setup() {
    const editor = useEditor({
      content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
      extensions: [StarterKit, Image],
    });

    return { editor };
  },
};
</script>
<script>
  import TodoItem from '$lib/todo-item.svelte'
  const title = 'Todooo'
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<h1>{title}</h1>
<!-- <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
<form action="" method="">
  <input type="text" aria-label="Add a todo" placeholder="+ type to add a todo" />

</form>

<TodoItem />
<TodoItem />
<TodoItem />



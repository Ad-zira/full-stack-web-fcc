// the name of the function will become the name of our action, in this case enhance
export const enhance = (form: HTMLFormElement, {
  result
}) => { // a param being passed to us by svelte that reperesents html element that we use the action on, so we will use the enhance action for html forms, so svelte automatically passes us a `form` typescript `HTMLFormElement` 
  // console.log('Form mounted to the DOM.');

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    try { // http request always use try/catch block
      const body = new FormData(form);
      const res = await fetch(form.action, { // the most important attribute, `action`
        method: form.method,
        // we can specify headers as well
        headers: {
          accept: "application/json"
        },
        body
      });
      
      if (res.ok) {
        result(res, form); 
      } else {
        console.error("Fetch Error: ", await res.text());
      }
      // return res;
    } catch (error) {
      console.error("Could not submit the form: ", error)
    }
    
  };

  form.addEventListener('submit', handleSubmit)

  return {
    destroy() {
      // console.log("Form removed from the DOM")
      form.removeEventListener('submit', handleSubmit)
    } 
  }
}
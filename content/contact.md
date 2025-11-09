---js
const eleventyNavigation = {
	key: "Contact",
	order: 3
};
---
# Contact

<div id="thank-you-message" style="display:none; 
       padding: 18px;
       border: 1px solid #93fcd6ff; 
       background-color: #E6FFF3; 
       color: #004D28; 
       border-radius: 4px;
       margin: 0 0 1rem 0;
       width: 90%;">
    <h2>✅ Submission Successful!</h2>
    <p>Thanks for the message!</p>
</div>

<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="f85eefcf-8a70-4bb8-a9be-af419b06d208">
  <input type="hidden" name="redirect" value="https://carpideira.com/contact/?status=success">
  <label>Name</label>
  <input type="text" name="name" required>
  <label>Email</label>
  <input type="email" name="email" required>
  <label>Message</label>
  <textarea name="message" required></textarea>
  <button type="submit">Submit</button>
</form>

{% script %}
    document.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
        
        if (params.get('status') === 'success') {
            const messageElement = document.getElementById('thank-you-message');
            
            if (messageElement) {
                messageElement.style.display = 'block';
            }
        }
    });
{% endscript %}
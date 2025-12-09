document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (!token) {
        console.log('No token found in URL');
        return;
    }
    
    console.log('Processing verification token:', token);
    
    try {
        const response = await fetch(`http://localhost:10001/verify?token=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ Email verified successfully');
            console.log('User:', data.user);
            
            // Show success message
            const container = document.querySelector('.container');
            const successMessage = document.createElement('div');
            successMessage.innerHTML = `
                <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                    <strong>✅ Verificación Exitosa!</strong><br>
                    Email: ${data.user.email}<br>
                    Nombre: ${data.user.fullName}
                </div>
            `;
            container.insertBefore(successMessage, container.querySelector('.btn'));
            
        } else {
            console.log('❌ Verification failed:', data.message);
            
            // Show error message
            const container = document.querySelector('.container');
            const errorMessage = document.createElement('div');
            errorMessage.innerHTML = `
                <div style="background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                    <strong>❌ Error de Verificación</strong><br>
                    ${data.message}
                </div>
            `;
            container.insertBefore(errorMessage, container.querySelector('.btn'));
        }
        
    } catch (error) {
        console.error('❌ Error during verification:', error);
        
        // Show error message
        const container = document.querySelector('.container');
        const errorMessage = document.createElement('div');
        errorMessage.innerHTML = `
            <div style="background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <strong>❌ Error de Conexión</strong><br>
                No se pudo completar la verificación. Intenta nuevamente.
            </div>
        `;
        container.insertBefore(errorMessage, container.querySelector('.btn'));
    }
});

import React from 'react'
import './Footer.css'


function Footer() {
  return (
    <div className='main-footer'>
        <div className='footer-container'>
            <div className='row'>
                <div className='col'>
                    <ul className='list-unstyled'>
                        <li><i href="https://twitter.com/galledann"class="fab fa-twitter fa"></i></li>
                        <li><i href="https://www.instagram.com/onrclklrr"class="fab fa-instagram fa"></i></li>
                        <li><i href="https://www.linkedin.com/in/onur-çelikler-429b02187/" class="fab fa-linkedin fa"></i></li>
                        <li><a href="/admin">Admin</a></li>
                    
                    </ul>
                </div>
                <div className='col'>
                    <ul className='list-unstyled'>
                        <li><i class="fas fa-envelope"></i> info@steels.com</li>
                        <li><i class="fas fa-phone"></i> +90 505 333 90 31</li>   
                    </ul>
             
                
                </div>
            </div>
            <hr />
            <div className='row'>
                <p className='col-sm'>
                    &copy;({new Date().getFullYear()}) Steels Foundation |  All rights reserved | Terms of Service | Privacy
                </p>
                
            </div>
        </div>
    </div>
  )
}
export default Footer
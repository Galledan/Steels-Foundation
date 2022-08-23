import React from 'react'
import './Footer.css'


function Footer() {
  return (
    <div className='main-footer'>
        <div className='footer-container'>
            <div className='row'>
                <div className='col'>
                    <ul className='list-unstyled'>
                        <li><i class="fab fa-twitter"></i></li>
                        <li><i class="fab fa-facebook"></i></li>
                        <li><i class="fab fa-instagram"></i></li>
                        <li><i class="fab fa-youtube"></i></li>
                    
                    </ul>
                </div>
                <div className='col'>
                    <ul className='list-unstyled'>
                        <li><i class="fas fa-envelope"> info@steels.com</i></li>
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
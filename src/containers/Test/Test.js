import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as productActions from '../../redux/modules/products';
import {isLoaded, load as loadproducts} from '../../redux/modules/products';
import {initializeWithKey} from 'redux-form';
import { asyncConnect } from 'redux-async-connect';

export class Test extends Component {
  render()
  {
  return
  (
<div>
<head>
<title>SPORTY Bootstarp responsive Website Template| Home :: w3layouts</title>
<link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
<script src="js/jquery.min.js"></script>
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css' />
<link href='http://fonts.googleapis.com/css?family=Dancing+Script:400,700' rel='stylesheet' type='text/css' />
<script src="js/jquery.easydropdown.js"></script>
<script src="js/responsiveslides.min.js"></script>

</head>
<body>
	<div className="header">
		<div className="top-header">
			<div className="container">
				<div className="header-left">
					<p>Take and Extra 20% OFF with order upto $99</p>
				</div>
				<div className="login-section">
					<ul>
						<li><a href="login.html">Login</a>  </li> |
						<li><a href="register.html">Register</a> </li>
					</ul>
				</div>
				    <div className="search-box">
					    <div id="sb-search" className="sb-search">
							<form>
								<input className="sb-search-input" placeholder="Enter your search term..." type="search" name="search" id="search" />
								<input className="sb-search-submit" type="submit" value="" />
								<span className="sb-icon-search"> </span>
							</form>
						</div>
				    </div>
					<script src="js/classie.js"></script>
					<script src="js/uisearch.js"></script>
						<script>
							new UISearch( document.getElementById( 'sb-search' ) );
						</script>
				<div className="clearfix"></div>
			</div>
		</div>
		<div className="bottom-header">
			<div className="container">
				<div className="logo">
					<a href="index.html"><h1>sporty</h1></a>
				</div>
				<div className="header_bottom_right">
					<div className="h_menu4">
					<a className="toggleMenu" href="">Menu</a>
					<ul className="nav">
						<li className="active"><a href="index.html">HOME</a></li>
						<li><a href="products.html" className="root">FOOTBALL</a>
							<ul>
								<li><a href="products.html">Accessories</a></li>
								<li><a href="products.html">Footwear</a></li>
								<li><a href="products.html">t-shirts</a></li>
								<li><a href="products.html">sporty dresses</a></li>
								<li><a href="products.html">balls</a></li>
								<li><a href="products.html">sales</a></li>
							</ul>
						</li>
						<li><a href="bikes.html">BIKES</a>
							<ul>
								<li><a href="bikes.html">Accessories</a></li>
								<li><a href="bikes.html">helmets</a></li>
								<li><a href="bikes.html">Footwear</a></li>
								<li><a href="bikes.html">spets</a></li>
								<li><a href="bikes.html">arms</a></li>
								<li><a href="bikes.html">sales</a></li>
							</ul>
						</li>
						<li><a href="products.html">GOLF</a>
							<ul>
								<li><a href="products.html">Accessories</a></li>
								<li><a href="products.html">Footwear</a></li>
								<li><a href="products.html">Apparel</a></li>
							</ul>
						</li>
							<li><a href="contact.html">CONTACT</a></li>
						</ul>
						<script type="text/javascript" src="js/nav.js"></script>
				</div>
					<div className="clearfix"></div>
				</div>
			</div>
		</div>
	</div>
	<div className="content">
		<div className="container">
			<div className="brand">
				<div className="col-md-8 main">
					<img src="images/main.jpg" alt="" />
				</div>
				<div className="col-md-4 sub">
					<img src="images/side-img.jpg" alt="" />
					<div className="add-to-cart">
					<p>Lorem ipsum dolor</p>
					 <form action="" className="sky-form">
						     <fieldset>					
							   <section>
							     <div className="rating">
									<input type="radio" name="stars-rating" id="stars-rating-5" />
									<label for="stars-rating-5"><i className="icon-star"></i></label>
									<input type="radio" name="stars-rating" id="stars-rating-4" />
									<label for="stars-rating-4"><i className="icon-star"></i></label>
									<input type="radio" name="stars-rating" id="stars-rating-3" />
									<label for="stars-rating-3"><i className="icon-star"></i></label>
									<input type="radio" name="stars-rating" id="stars-rating-2" />
									<label for="stars-rating-2"><i className="icon-star"></i></label>
									<input type="radio" name="stars-rating" id="stars-rating-1" />
									<label for="stars-rating-1"><i className="icon-star"></i></label>
									<div className="clearfix"></div>
								 </div>
							  </section>
						    </fieldset>
						  </form>
						<span>$91.00</span>
						<button className="cart-button">
							<i className="white-cart"></i>
						    <span>| Add to Cart</span>
						</button>
						</div>
						<div className="clearfix"></div>
				</div>
				<div className="clearfix"></div>
			</div>
			<div className="watch-and-buy">
				<div className="select">
					<h2>watch & Buy</h2>
				</div>
				<div className="preview">
					<img src="images/side2.jpg" alt="" />
					<i className="bag"></i>
				</div>
				<div className="preview">
					<img src="images/side1.jpg" alt="" />
					<i className="bag"></i>
				</div>
				<div className="preview span_66">
					<img src="images/side.jpg" alt="" />
					<i className="bag"></i>
				</div>
				<div className="clearfix"></div>
		    </div>
	<div className="sap_tabs">	
						 <div id="horizontalTab" style="display: block; width: 100%; margin: 0px;">
						  <ul className="resp-tabs-list">
						  	  <li className="resp-tab-item" aria-controls="tab_item-2" role="tab"><span>new arrivals</span></li>
							  <li className="resp-tab-item" aria-controls="tab_item-1" role="tab"><span>latest products</span></li>
							  <li className="resp-tab-item" aria-controls="tab_item-0" role="tab"><span>best seller</span></li>
							  <div className="clearfix"></div>
						  </ul>				  	 
							<div className="resp-tabs-container">
							    <div className="tab-1 resp-tab-content" aria-labelledby="tab_item-0">
									<ul className="tab_img">
									  <li>
										<div className="view view-first">
					   		  			   <img src="images/pic1.jpg" className="img-responsive" alt=""/>
										   <div className="info1"><h4>hot</h4> </div>
											 <div className="mask">
						                        
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
											
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li>
										  <div className="view view-first">
					   		  			   <img src="images/pic2.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li className="last">
										  <div className="view view-first">
					   		  			   <img src="images/pic3.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
									    <li>
									     <div className="view view-first">
					   		  			   <img src="images/pic4.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li>
										 <div className="view view-first">
					   		  			   <img src="images/pic12.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li className="last">
										  <div className="view view-first">
					   		  			   <img src="images/pic6.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<div className="clearfix"></div>
									</ul>
							     </div>	
							     <div className="tab-1 resp-tab-content" aria-labelledby="tab_item-1">
									<ul className="tab_img">
									  <li>
										<div className="view view-first">
					   		  			   <img src="images/pic8.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li>
										  <div className="view view-first">
					   		  			   <img src="images/pic7.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li className="last">
										  <div className="view view-first">
					   		  			   <img src="images/pic3.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								             <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
									    <li>
									     <div className="view view-first">
					   		  			   <img src="images/pic9.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li>
										 <div className="view view-first">
					   		  			   <img src="images/pic12.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li className="last">
										  <div className="view view-first">
					   		  			   <img src="images/pic6.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<div className="clearfix"></div>
									</ul>
							     </div>	
							     <div className="tab-1 resp-tab-content" aria-labelledby="tab_item-2">
									<ul className="tab_img">
									  <li>
										<div className="view view-first">
					   		  			   <img src="images/pic10.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li>
										  <div className="view view-first">
					   		  			   <img src="images/pic2.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li className="last">
										  <div className="view view-first">
					   		  			   <img src="images/pic3.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
									    <li>
									     <div className="view view-first">
					   		  			   <img src="images/pic4.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li>
										 <div className="view view-first">
					   		  			   <img src="images/pic5.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li className="last">
										  <div className="view view-first">
					   		  			   <img src="images/pic11.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												 <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<div className="clearfix"></div>
									</ul>
							     </div>	
							     <div className="tab-1 resp-tab-content" aria-labelledby="tab_item-3">
									<ul className="tab_img">
									  <li>
										<div className="view view-first">
					   		  			   <img src="images/pic10.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li>
										  <div className="view view-first">
					   		  			   <img src="images/pic2.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li>
										  <div className="view view-first">
					   		  			   <img src="images/pic9.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												 <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
									    <li>
									     <div className="view view-first">
					   		  			   <img src="images/pic4.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li>
										 <div className="view view-first">
					   		  			   <img src="images/pic13.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								              <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<li className="last">
										  <div className="view view-first">
					   		  			   <img src="images/pic8.jpg" className="img-responsive" alt=""/>
											 <div className="mask">
						                        <div className="info1"> </div>
								              </div>
								             <div className="tab_desc">
											  <div className="tab_desc_1">
												  <h5>Lorem ipsum dolor</h5>
											  </div>
											  <div className="tab_desc_2">
												  <p>$59.95</p>
											  </div>
											  <div className="clearfix"></div>
											  </div>
										  </div>
										  <img src="images/rating.png" alt="" />
										</li>
										<div className="clearfix"></div>
									</ul>
							</div>		        					 	        					 
					</div>	
              </div>
         </div>
		</div>
			<div className="shipping">
				<div className="container">
					<div className="shipping-section-grid">
						<div className="col-md-7 shipping-left-grid">
							<h3>free shipping</h3>
							<div className="icon">
								<img src="images/shipping-icon.png" alt="" />
							</div>
							<div className="icon-text">
								<p>Lorem ipsum is dolor sit suspendise amet latest videos of lorem   feworem ipsum is dolor sit sud spendi desig sunpoen controey   feworem ipsum is dolor sit suspendi desig.</p>
							</div>
							<div className="clearfix"></div>
						</div>
						<div className="col-md-5 shipping-right-grid">
							<h3>news letter</h3>
							<div className="news-search-box">
                         <form> 
                         <input type="text" className="text" value="" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '';}" />
                          <input type="submit" value />
	                    </form> 
	                   </div>
				    </div>
					<div className="clearfix"></div>
					</div>
				</div>
			</div>
			<div className="map">
				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d396369.7968760607!2d-94.5757195!3d39.091919000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0f75eafe99997%3A0x558525e66aaa51a2!2sKansas+City%2C+MO%2C+USA!5e0!3m2!1sen!2sin!4v1416895090472"  frameborder="0" style="border:0"></iframe>
				<div className="map-layer">
					<div className="map-layer-bottom text-center">
						<h4>follow us</h4>
						<div className="social-icons">
							<i className="facebook"></i>
							<i className="twitter"></i>
							<i className="google-pluse"></i>
							<i className="pinterest"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	<div className="footer"> 
		<div className="container">
			<div className="col-md-3 shop">
				<h3>shop</h3>
				<ul>
					<li><a href="#">new arrivals</a></li>
					<li><a href="#">men</a></li>
					<li><a href="#">accessories</a></li>
					<li><a href="#">kids</a></li>
					<li><a href="#">brands</a></li>
					<li><a href="#">trends</a></li>
					<li><a href="#">sale</a></li>
					<li><a href="#">style videos</a></li>
				</ul>
			</div>
			<div className="col-md-3 shop">
				<h3>help</h3>
				<ul>
					<li><a href="#">frequently asked questions</a></li>
					<li><a href="#">women</a></li>
					<li><a href="#">style videos</a></li>
					<li><a href="#">sale</a></li>
					<li><a href="#">trends</a></li>
					<li><a href="#">style videos</a></li>
				</ul>
			</div>
			<div className="col-md-3 shop">
				<h3>account</h3>
				<ul>
					<li><a href="#">my sports</a></li>
					<li><a href="#">my orders</a></li>
					<li><a href="#">my shopping bag</a></li>
					<li><a href="#">my wishlist</a></li>
				</ul>
			</div>
			<div className="col-md-3 shop">
				<h3>popular</h3>
				<ul>
					<li><a href="#">accessories</a></li>
					<li><a href="#">brands</a></li>
					<li><a href="#">frequently asked questions</a></li>
					<li><a href="#">style videos</a></li>
					<li><a href="#">women</a></li>
					<li><a href="#">my orders</a></li>
				</ul>
			</div>
			<div className="clearfix"></div>
			<div className="copy-rights">
				<p>&copy; 2014 Design by <a href="http://w3layouts.com" target="target_blank">W3layouts</a></p>
			</div>
		</div>
	</div>
</body>
</div>
);
}
}
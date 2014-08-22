/* 
 * AngularJS Omni Bar Directive
 * 
 * Creates a simple bar to display a comparison of sub-value over the total-value.
 *
 * Project started on: Thu, 21 Aug 2014 - 15:30:31 
 * Current version: 0.1.0
 * 
 * Released under the MIT License
 * --------------------------------------------------------------------------------
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Ignatius Steven (https://github.com/isteven)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions: 
 *
 * The above copyright notice and this permission notice shall be included in all 
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
 * SOFTWARE.
 * --------------------------------------------------------------------------------
 */

angular.module( 'isteven-omni-bar', ['ng'] ).directive( 'istevenOmniBar' , [ '$timeout', function ( $timeout ) {
    return {
        restrict: 
            'AE',

        replace: 
            true,

        transclude: 
            true,

        scope: 
        {   
            // bars
            currentValue    : '=',
            currentStyle    : '=',     

            maxValue        : '=',            
            maxStyle        : '=',

            // bar container
            containerStyle  : '=',

            // text
            infoStyle       : '=',
            infoFormat      : '=',

            // callbacks
            onClick         : '&'
        },

        template: 
            '<div class="containerBar">' +       
                    '<div class="maxValue" ng-style="maxStyle">' +                                                         
                        '<div class="currentValue" ng-style="currentStyle">' + 
                        '</div>' +                        
                        '<span ng-transclude class="infoText" ng-style="infoStyle"></span>' +
                    '</div>' +
            '</div>',

        link: function ( $scope, element, attrs ) {               

            var currentValueBar = element.children().children()[ 0 ];
            var maxValueBar     = element.children()[ 0 ];
            var containerBar    = element;

            $scope.setWidth = function( currentVal, maxVal ) {            
                if ( typeof maxVal === 'undefined' || maxVal === null ) {
                    var calculatedWidth = currentVal; 
                }
                else {
                    var calculatedWidth = ( currentVal / maxVal ) * 100;   
                }
                currentValueBar.setAttribute( 'style', 'width:' + calculatedWidth + '%' );
            }

            $scope.setWidth( 0 , null );

            $timeout( function() {            
                
                $scope.$watch( 'currentValue' , function( newVal, oldVal ) {
                    if ( typeof newVal !== 'undefined' ) {
                        console.log( 'triggered' );
                        $scope.setWidth( newVal, $scope.maxValue );                    
                    }
                });

                $scope.$watch( 'maxValue', function( newVal, oldVal ) {
                    if ( typeof newVal !== 'undefined' ) {
                        $scope.setWidth( $scope.currentValue , newVal );                    
                    }
                });

                $scope.$watch( 'infoFormat', function( newVal, oldVal ) {
                    $scope.infoText = newVal;
                });

                $scope.$watch( 'currentStyle', function( newVal, oldVal ) {   
                    if ( typeof newVal !== 'undefined' ) {
                        console.log( 'here' );
                        angular.element( currentValueBar ).css( newVal );
                    }
                });

                $scope.$watch( 'maxStyle', function( newVal, oldVal ) {   
                    if ( typeof newVal !== 'undefined' ) {
                        angular.element( maxValueBar ).css( newVal );
                    }
                });
                
                $scope.$watch( 'containerStyle', function( newVal, oldVal ) {   
                    if ( typeof newVal !== 'undefined' ) {
                        angular.element( containerBar ).css( newVal );
                    }
                });

            }, 250 );
        }
    }
}]);

helper = {};

helper.date = function( sInput )
{
	return sInput.substr( 6,2 ) + "." + sInput.substr( 4,2 ) + "." + sInput.substr( 0, 4 );
};

helper.counterCurrency = function( mFxDeal )
{
	if( mFxDeal.base_currency === mFxDeal.fx_leg.net_dealt_currency )
	{
		return mFxDeal.terms_currency;
	}
	else
	{
		return mFxDeal.base_currency;
	}
};

helper.amount = function( sInput )
{
	var sAmount = parseInt( sInput, 10 ).toString(), i, pOutput = [], nStart, nLength;

	for( i = sAmount.length - 3; i > -3; i -= 3 )
	{	
		nStart = Math.max( i, 0 );
		nLength = Math.min( sAmount.length - pOutput.length * 3, 3 );

		pOutput.push( sAmount.substr( nStart, nLength ) );
	}

	return pOutput.reverse().join( "." );
};
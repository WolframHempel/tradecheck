var INPUT = '<deal_notification ret_ref="4415691"><deal><ret_id>4415691</ret_id><order_id>4.16725004</order_id><deal_date>20130514</deal_date><deal_time>10:06:10</deal_time><maker_name>trader2@danskecust</maker_name><taker_name>org</taker_name><proxy_name>fxall</proxy_name><maker_memo/><unregistered_taker_name/><unregistered_taker_id/><entered_by/><split_id>0</split_id><total_split>1</total_split><total_req>1</total_req><net_takerbuysbase>false</net_takerbuysbase><fx_deal product="SPOT"><base_currency>EUR</base_currency><terms_currency>HUF</terms_currency><fx_leg num="0" taker_buys_base="false"><ret_ref>4415691.0</ret_ref><maturity_date type="SPOT">20130516</maturity_date><num_requirements>1</num_requirements><net_contra_amount>368900000.00</net_contra_amount><net_dealt_amount>1250000.00</net_dealt_amount><net_dealt_currency>EUR</net_dealt_currency><fx_requirement taker_buys_base="false"><ret_ref>4415691.0.0</ret_ref><dealt_currency>EUR</dealt_currency><dealt_amount>1250000.00</dealt_amount><contra_amount>368900000.00</contra_amount><counterparty>DEUTFRA</counterparty><remarks/></fx_requirement><quote><spot_price>295.12</spot_price><spot_margin>0</spot_margin><spot_dps>2</spot_dps><fwd_pts>0.00</fwd_pts><fwd_margin>0.00</fwd_margin><fwd_dps>2</fwd_dps><all_in>295.1200</all_in><trm_spot_bid/><trm_spot_ask/><trm_fwd_pt_bid/><trm_fwd_pt_ask/><core_taker_spot_price>295.12</core_taker_spot_price><market_spot_price>295.12</market_spot_price><core_market_spot_price>295.12</core_market_spot_price><market_fwd_pts>0.00</market_fwd_pts><core_market_fwd_pts>0.00</core_market_fwd_pts><spot_markup>0</spot_markup><fwd_markup>0.00</fwd_markup><markup_breakdown><base_spot_markup>0</base_spot_markup><volume_spot_markup>0</volume_spot_markup><customer_spot_markup>0</customer_spot_markup><base_fwd_markup>0.00</base_fwd_markup><volume_fwd_markup>0.00</volume_fwd_markup><customer_fwd_markup>0.00</customer_fwd_markup></markup_breakdown></quote></fx_leg></fx_deal></deal></deal_notification>';


$(function(){

	var $Input = $('#input');
	var $Output = $('#output');
	var oTemplate = Handlebars.compile( $Output.html() );

	var fAddNode = function( mRoot, eNode )
	{
		var sName, i;

		for( i = 0; i < eNode.children.length; i++ )
		{
			sName = eNode.children[ i ].localName;

			if( eNode.children[ i ].children.length > 0 )
			{
				mRoot[ sName ] = {};
				fAddNode( mRoot[ sName ], eNode.children[ i ] );
			}
			else
			{
				mRoot[ sName ] = eNode.children[ i ].textContent;
			}
		}
	};


	var fParseXml = function()
	{
		

		if( $Input.val().length === 0 )
		{
			return;
		}

		$(".alert").hide();
		
		var eRootNode = $( $Input.val() ).find( "deal" ).get( 0 );

		var mData = {};

		if( eRootNode && eRootNode.localName === "deal" )
		{
			$Input.val( "" );

			fAddNode( mData, eRootNode );

			$Output.html( oTemplate( mData ) ).show();

			$(".alert-success").show();
		}
		else
		{
			$(".alert-error").show();
		}
	};

	for( var sName in helper )
	{
		Handlebars.registerHelper( sName, helper[ sName ] );
	}
	
	$Input.keyup( fParseXml );
});